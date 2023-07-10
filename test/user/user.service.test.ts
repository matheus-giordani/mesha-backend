import { ApiError } from './../../src/utils/MsgError';
/* eslint-disable prefer-const */
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { returnMockGet } from '../mock/userService/userGet.mock';
import { PrismaService } from './../../src/common/prisma.service';
import { UserService } from './../../src/user/user.service';
import { returnMockGetAll } from './../mock/userService/userGetAll.mock';
import {
  MockRegisteredUser, mockUser,
  returnMockCreate
} from './../mock/userService/userPost.mock';
import { putUserMock, returnPutExistingUser, returnPutMock } from './../mock/userService/userPut.mock';

describe('UserService', () => {
  let userService: UserService;
  let prismaService = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      
    },
    conhecimento:{
      createMany: jest.fn(),
      deleteMany: jest.fn(),
    }
  }
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ UserService, PrismaService,]
      
    })
    .overrideProvider(PrismaService)
    .useValue(prismaService)
    .compile();
    userService = moduleRef.get<UserService>(UserService);
    
  });

  describe('getAll', () => {
    it('should return an array of the Users', async () => {
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(returnMockGetAll);
      const copyMock = [...returnMockGetAll];
      const result = await userService.getAll();
      expect(result).toStrictEqual(copyMock);
    });
  });

  describe('get ', () => {
    it('should return one user', async () => {
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(returnMockGet);
      const copyMock = { ...returnMockGet };
      const result = await userService.get(37);
      expect(result).toStrictEqual(copyMock);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: returnMockGet.id },
        include: { conhecimentos: true },
      });
    });

    it('should return one Error', async () => {
      const userId = 1;
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      expect(userService.get(userId)).rejects.toThrowError(NotFoundException);
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: 1 },
        include: { conhecimentos: true },
      });
    });
  });

  describe('post', () => {
    it('should return a create user', async () => {
      jest.spyOn(userService, 'getAll').mockResolvedValue(returnMockGetAll);
      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(returnMockCreate);
      jest
        .spyOn(prismaService.conhecimento, 'createMany')
        .mockResolvedValue(null);

      const result = await userService.post(mockUser);
      expect(result).toStrictEqual(returnMockCreate);
      expect(prismaService.conhecimento.createMany).toBeCalled();
    });
    it('should throw CPF error', async () => {
      jest.spyOn(userService, 'getAll').mockResolvedValue(returnMockGetAll);

      expect(userService.post(MockRegisteredUser)).rejects.toThrowError(
        ApiError,
      );
    });
  });

  describe('put', () => {
    it('should update and return user', async () => {
      const copyMock = {...returnPutMock}

      jest.spyOn(prismaService.conhecimento, 'deleteMany')
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(returnPutExistingUser);
        jest.spyOn(prismaService.user, 'update').mockResolvedValue(returnPutMock)

      const result = await userService.put(putUserMock.id,putUserMock);

      expect(result).toStrictEqual(copyMock)
      expect(prismaService.conhecimento.deleteMany).toBeCalledWith({
        where: { userId: putUserMock.id },
      })
     
    });


    it('should return NotFoundException error', async () => {
      const copyMock = {...returnPutMock}

      
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(null);
     
      

      expect(userService.put(putUserMock.id,putUserMock)).rejects.toThrowError(NotFoundException)
      
     
    });
  });
});
