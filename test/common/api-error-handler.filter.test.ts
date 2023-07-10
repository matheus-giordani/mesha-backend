import { ArgumentsHost, HttpAdapterHost } from '@nestjs/common';
import { ApiErrorExceptionFilter } from './../../src/common/error-handler/api-error-handler.filter';
import { ApiError } from './../../src/utils/MsgError';
describe('ApiErrorExceptionFilter', () => {
  let filter: ApiErrorExceptionFilter;
  let httpAdapterHost: HttpAdapterHost;
  let mockAdapter: any;
  let mockHost: ArgumentsHost;
  let mockResponse: any;
  let mockException: ApiError;

  beforeEach(() => {
    mockAdapter = {
      reply: jest.fn(),
    };
    mockResponse = {};
    mockException = new ApiError([{ cause: 'Error message' }], 400);

    httpAdapterHost = {
      httpAdapter: mockAdapter,
    };

    mockHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as unknown as ArgumentsHost;

    filter = new ApiErrorExceptionFilter(httpAdapterHost);
  });

  it('should catch the exception and reply with the appropriate response', () => {
    filter.catch(mockException, mockHost);

    expect(mockAdapter.reply).toHaveBeenCalledWith(
      mockResponse,
      { httpStatus: 400, message: [{ cause: 'Error message' }] },
      400,
    );
  });
});
