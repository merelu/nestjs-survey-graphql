import { CreateAnswerModel, AnswerModel } from '@domain/model/database/answer';
import { EntityManager } from 'typeorm';

export interface IAnswerRepository {
  create(data: CreateAnswerModel, conn?: EntityManager): Promise<boolean>;

  delete(id: number, conn?: EntityManager): Promise<boolean>;

  softDelete(id: number, conn?: EntityManager): Promise<boolean>;
}
