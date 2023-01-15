import { CreateAnswerModel, AnswerModel } from '@domain/model/database/answer';
import { EntityManager } from 'typeorm';

export interface IAnswerRepository {
  create(data: CreateAnswerModel, conn?: EntityManager): Promise<AnswerModel>;

  delete(id: number, conn?: EntityManager): Promise<void>;

  softDelete(id: number, conn?: EntityManager): Promise<void>;
}
