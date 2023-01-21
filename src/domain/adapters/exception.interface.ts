import { ApolloError } from 'apollo-server-express';

export interface IFormatExceptionMessage {
  error_code: number;
  error_text: string;
}

export interface IException {
  apolloServerException(data?: IFormatExceptionMessage): ApolloError;
}
