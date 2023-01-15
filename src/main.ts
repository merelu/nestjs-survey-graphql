import { AllExceptionFilter } from '@infra/common/filter/exception.filter';
import { LoggingInterceptor } from '@infra/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from '@infra/common/interceptors/response.interceptor';
import { LoggerService } from '@infra/services/logger/logger.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor(new LoggerService()));

  await app.listen(3000);
}
bootstrap();
