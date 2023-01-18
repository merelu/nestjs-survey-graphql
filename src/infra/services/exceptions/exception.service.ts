import {
  IException,
  IFormatExceptionMessage,
} from '@domain/adapters/exception.interface';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

@Injectable()
export class ExceptionService implements IException {
  badRequestException(data: IFormatExceptionMessage): HttpException {
    return new BadRequestException(data);
  }

  notFoundException(data: IFormatExceptionMessage): HttpException {
    return new NotFoundException(data);
  }

  internalServerErrorException(data?: IFormatExceptionMessage): HttpException {
    return new InternalServerErrorException(data);
  }

  forbiddenException(data?: IFormatExceptionMessage): HttpException {
    return new ForbiddenException(data);
  }

  unauthorizedException(data?: IFormatExceptionMessage): HttpException {
    return new UnauthorizedException(data);
  }

  apolloServerException(data: IFormatExceptionMessage): ApolloError {
    return new GraphQLError(data.error_text, {
      extensions: {
        code: data.error_code,
      },
    });
  }
}
