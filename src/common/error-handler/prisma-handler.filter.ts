import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  catch(exception: Error, host: ArgumentsHost) {
    if (exception instanceof Prisma.PrismaClientKnownRequestError ) {
      
      const message = { ...exception.meta, httpStatus: HttpStatus.BAD_REQUEST };
      

      const response = host.switchToHttp().getResponse();
      this.httpAdapter.reply(response,message,HttpStatus.BAD_REQUEST)
    }
    else if(exception instanceof Prisma.PrismaClientUnknownRequestError){
      const message = { message:exception.message, httpStatus: HttpStatus.BAD_REQUEST };

      const response = host.switchToHttp().getResponse();
      this.httpAdapter.reply(response,message,HttpStatus.BAD_REQUEST)

    }
    else {
      throw exception;
    }
  }
}
