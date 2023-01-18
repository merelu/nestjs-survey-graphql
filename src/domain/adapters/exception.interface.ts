import { HttpException } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';

export interface IFormatExceptionMessage {
  error_code: number;
  error_text: string;
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): HttpException;
  notFoundException(data: IFormatExceptionMessage): HttpException;
  internalServerErrorException(data?: IFormatExceptionMessage): HttpException;
  forbiddenException(data?: IFormatExceptionMessage): HttpException;
  unauthorizedException(data?: IFormatExceptionMessage): HttpException;
  apolloServerException(data?: IFormatExceptionMessage): ApolloError;
}
