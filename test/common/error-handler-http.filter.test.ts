import { ArgumentsHost, HttpException } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { FilterExecptionHTTP } from './../../src/common/error-handler/error-handler-http.filter';

describe('FilterExecptionHTTP', () => {
  let filter: FilterExecptionHTTP;
  let httpAdapterHost: HttpAdapterHost;
  let mockAdapter: any;
  let mockHost: ArgumentsHost;
  let mockResponse: any;
  let mockException: HttpException;

  beforeEach(() => {
    mockAdapter = {
      reply: jest.fn(),
    };
    mockResponse = {};
    mockException = new HttpException('Error message', 400);

    httpAdapterHost = {
      httpAdapter: mockAdapter,
    };

    mockHost = {
        switchToHttp: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnValue(mockResponse),
    } as unknown as ArgumentsHost;

    filter = new FilterExecptionHTTP(httpAdapterHost);
  });

  it('should catch the exception and reply with the appropriate response', () => {
    filter.catch(mockException, mockHost);

    expect(mockAdapter.reply).toHaveBeenCalledWith(
      mockResponse,
      'Error message',
      400,
    );
  });
});
