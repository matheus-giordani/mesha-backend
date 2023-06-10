import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { ApiError } from './../../utils/MsgError';

@Catch(ApiError)
export class ApiErrorExceptionFilter implements ExceptionFilter {
    private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  catch(exception: ApiError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus() || 500;
    const message = exception.message || 'Erro interno no servidor';
     this.httpAdapter.reply(response,message,status)
}
}