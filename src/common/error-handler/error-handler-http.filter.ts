import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class FilterExecptionHTTP implements ExceptionFilter {
  private httpAdapter: AbstractHttpAdapter;
  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();

    const { status, body } = {
      status: exception.getStatus(),
      body: exception.getResponse(),
    };

    this.httpAdapter.reply(res, body, status);
  }
}
