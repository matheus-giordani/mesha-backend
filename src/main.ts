import { ValidationPipe } from './common/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import {join} from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
  const config = new DocumentBuilder()
    .setTitle('API User Documentation ')
    .setDescription('The User API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/coverage', express.static(join(__dirname,'..','..','coverage', 'lcov-report')))
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap().then(() => console.log('listining http://localhost/3000'));
