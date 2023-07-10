import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from "./../../src/common/prisma.service";
import * as supertest from 'supertest';
import { getAllMock } from "../mock/usercontroller/getAllController.mock";
import { getMock } from "../mock/usercontroller/getController.mock";
import { postMock } from "../mock/usercontroller/postController.mock";
import { PutMock } from "../mock/usercontroller/putController.mock";
import { AppModule } from "./../../src/app.module";
import { UserService } from './../../src/user/user.service';
import { returnMockGet } from "./../mock/userService/userGet.mock";
import { returnMockGetAll } from "./../mock/userService/userGetAll.mock";
import { mockUser, returnMockCreate } from "./../mock/userService/userPost.mock";
import { putUserMock, returnPutMock } from "./../mock/userService/userPut.mock";


describe("UserController", ()=>{
    let app: INestApplication
    let userService: UserService
    let moduleRef: TestingModule
    const prismaService = {
        onModuleInit: jest.fn(),
        enableShutdownHooks: jest.fn()
    }
    beforeAll(async ()=>{
        moduleRef = await Test.createTestingModule({
            imports: [AppModule],
          })
          .overrideProvider(PrismaService)
          .useValue(prismaService)
          .compile();
          
          app = moduleRef.createNestApplication();
          await app.init();
          userService = moduleRef.get<UserService>(UserService);

    })



    describe('/Get All', ()=>{
        it('should return a user array with status 200', async () =>{
            jest.spyOn(userService, 'getAll').mockResolvedValue(returnMockGetAll)

            const response = await supertest(app.getHttpServer()).get('/user').expect(200)
            const users = response.body
            expect(users).toStrictEqual(getAllMock)
           
                
        },10000)
    })

    describe('/Get User', ()=>{
        it('should return a user with status 200 ', async ()=>{
            jest.spyOn(userService, 'get').mockResolvedValue(returnMockGet)
            const response = await supertest(app.getHttpServer()).get('/user/37').expect(200)
            const user = response.body
            expect(user).toStrictEqual(getMock)
        })

        it('should return a paramater error ', async ()=>{
            const response = await supertest(app.getHttpServer()).get('/user/3a7').expect(400)
            const user = response.body
            const messageError = {
                "message": "Invalid ID parameter"
            }
            expect(user).toStrictEqual(messageError)
        })

    })

    describe('/Post', ()=>{
        it('should return created user', async ()=>{
            jest.spyOn(userService, 'post').mockResolvedValue(returnMockCreate)
            const response = await supertest(app.getHttpServer()).post('/user').send(mockUser).expect(201)
            const createdUser = response.body
            expect(createdUser).toStrictEqual(postMock) 
        })

    })

    describe('/Put', ()=>{
        it('should update a user', async () =>{
            jest.spyOn(userService, 'put').mockResolvedValue(returnPutMock)

            const response = await supertest(app.getHttpServer()).put('/user/37').send(putUserMock).expect(200)
            const updatedUser = response.body
            expect(updatedUser).toStrictEqual(PutMock)
        })
    })

    afterAll(async () => {
        await app.close();
      });
})