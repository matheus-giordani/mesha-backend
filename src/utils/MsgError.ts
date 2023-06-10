import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
 public message;
  constructor(mensagem: { cause: string }[], httpStatus: HttpStatus) {
    const msg = {
      message: [...mensagem],
      httpStatus: httpStatus,
    };
    
    super(msg, httpStatus);
    this.message = msg
  }
}
