import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get Users Success',
    type: UserDTO,
    isArray: true,
  })
  async getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({
    status: 200,
    description: 'Get User Success',
    type: UserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Not a number route param',
    schema: {
      example: {
        message: 'Invalid ID parameter',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
        error: 'Not Found',
      },
    },
  })
  async get(@Param('id') id: string) {
    return this.userService.get(parseInt(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 201,
    description: 'Create User Success',
    type: UserDTO,
  })
  @ApiResponse({
    status: 409,
    description: 'CPF has been registered',
    schema: {
      example: {
        message: {
          cause: 'CPF já cadastrado na base de dados',
        },
        httpStatus: 409,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: {
        statusCode: 400,
        message: 'Validation failed',
        error: 'Bad Request',
      },
    },
  })
  @HttpCode(201)
  async createUser(@Body() user: UserDTO) {
    return await this.userService.post(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  @ApiResponse({
    status: 200,
    description: 'Update User Success',
    type: UserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Not a number route param',
    schema: {
      example: {
        message: 'Invalid ID parameter',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
        error: 'Not Found',
      },
    },
  })
  async put(@Param('id') id: string, @Body() user: UserDTO) {
    return await this.userService.put(parseInt(id), user);
  }
}
