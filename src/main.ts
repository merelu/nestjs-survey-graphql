import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { AllExceptionFilter } from '@infra/common/filters/all-exception.filter';
import { LoggingInterceptor } from '@infra/common/interceptors/logger.interceptor';
import { ExceptionService } from '@infra/services/exceptions/exception.service';
import { LoggerService } from '@infra/services/logger/logger.service';
import { WinstonLogger } from '@infra/utils/winston.logger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonLogger,
  });

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[] = []) => {
        const exceptionService = new ExceptionService();
        return exceptionService.apolloServerException({
          error_code: CommonErrorCodeEnum.INVALID_PARAM,
          error_text: `${errors.map((i) =>
            i.constraints ? Object.values(i.constraints)[0] : '',
          )}`,
        });
      },
    }),
  );

  app.useGlobalFilters(
    new AllExceptionFilter(new LoggerService(), new ExceptionService()),
  );

  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  await app.listen(4000);
}
bootstrap();
