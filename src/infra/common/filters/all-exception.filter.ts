import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { ExceptionService } from '@infra/services/exceptions/exception.service';
import { LoggerService } from '@infra/services/logger/logger.service';
import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
NotFoundException;
@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const gqlInfo = gqlHost.getInfo();
    const ctx = host.switchToHttp();
    const request: any = ctx.getRequest();
    const path = gqlInfo
      ? `${gqlInfo.path.typename} ${gqlInfo.path.key}`
      : request.path;

    if (exception instanceof GraphQLError) {
      this.logger.warn(
        `End Request for ${path}`,
        `code=${exception.extensions.code} message=${exception.message}`,
      );
      return exception;
    } else {
      const result = this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러',
      });

      this.logger.error(
        `End Request for ${path}`,
        `message=${exception.message}`,
        `${exception.stack}`,
      );
      return result;
    }
  }
}
