import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './../common/prisma.service';
import { ApiError } from './../utils/MsgError';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async post(CreateUser) {
    const { conhecimentos, ...userData } = CreateUser;

    const allUsers = await this.getAll();
    // procura cpf existente na base de dados
    const userFinded = allUsers.find((user) => {
      return user.cpf === CreateUser.cpf;
    });
    if (userFinded) {
      throw new ApiError(
        [{ cause: 'CPF já cadastrado na base de dados' }],
        HttpStatus.CONFLICT,
      );
    }
    const createdUser = await this.prisma.user.create({
      data: userData,
    });

    if (conhecimentos && conhecimentos.length > 0) {
      const conhecimentosData = conhecimentos.map((conhecimento) => ({
        nome: conhecimento.name,
        userId: createdUser.id,
      }));

      await this.prisma.conhecimento.createMany({
        data: conhecimentosData,
      });
    }

    return createdUser;
  }
  getAll() {
    return this.prisma.user.findMany({ include: { conhecimentos: true } });
  }

  async get(id: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      include: { conhecimentos: true },
    });
    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return existingUser;
  }

  async put(id: number, user) {
    const { conhecimentos, ...userData } = user;

    const existingUser = await this.prisma.user.findUnique({
      where: { id },
      include: { conhecimentos: true }, // Incluir conhecimentos relacionados ao usuário
    });

    if (!existingUser) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    if (conhecimentos && conhecimentos.length > 0) {
      // Excluir conhecimentos existentes do usuário
      await this.prisma.conhecimento.deleteMany({
        where: { userId: id },
      });

      const conhecimentosData = conhecimentos.map((conhecimento) => ({
        nome: conhecimento.name,
        userId: id,
      }));

      // Criar novos conhecimentos para o usuário
      await this.prisma.conhecimento.createMany({
        data: conhecimentosData,
      });
    }

    return updatedUser;
  }
}
