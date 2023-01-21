import {
  IException,
  IFormatExceptionMessage,
} from '@domain/adapters/exception.interface';
import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

@Injectable()
export class ExceptionService implements IException {
  apolloServerException(data: IFormatExceptionMessage): ApolloError {
    return new GraphQLError(data.error_text, {
      extensions: {
        code: data.error_code,
      },
    });
  }
}
