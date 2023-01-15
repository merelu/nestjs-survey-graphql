import { ILogger } from '@domain/adapters/logger.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: ILogger) {}
  //any 수정 필요
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    return next.handle().pipe(
      map((body) => {
        this.logger.debug(
          'Response',
          `is_array=${Array.isArray(body)} duration=${Date.now() - now}ms ${
            request.method
          } ${request.path} body=${JSON.stringify(body)}`,
        );
        return body;
      }),
    );
  }
}
