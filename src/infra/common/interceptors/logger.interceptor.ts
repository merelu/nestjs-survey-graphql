import { LoggerService } from '@infra/services/logger/logger.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const now = Date.now();
    const gqlContext = GqlExecutionContext.create(context);

    const request = gqlContext.getContext().req;
    const gqlPath = gqlContext.getInfo().path;
    const path = gqlPath ? `${gqlPath.typename} ${gqlPath.key}` : request.path;

    this.logger.log(
      `Incoming request on ${path}`,
      `method=${request.method} ip=${request.ip}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${path}`,
          `method=${request.method} ip=${request.ip} duration=${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
