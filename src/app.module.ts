import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ApiErrorExceptionFilter } from './common/error-handler/api-error-handler.filter';
import { FilterExecptionHTTP } from './common/error-handler/error-handler-http.filter';
import { PrismaExceptionFilter } from './common/error-handler/prisma-handler.filter';
import { ValidateIdMiddleware } from './common/middlewares/validationParam.middleware';
import { PrismaService } from './common/prisma.service';
import { ValidationPipe } from './common/validation.pipe';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [ UserController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: FilterExecptionHTTP,
    },
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    {provide: APP_FILTER, useClass: ApiErrorExceptionFilter},
    
    
  UserService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateIdMiddleware)
      .forRoutes('user/:id');
  }
}
