import {
  CreateQuestionModel,
  QuestionModel,
} from '@domain/model/database/question';
import { EntityManager } from 'typeorm';

export interface IQuestionRepository {
  create(
    data: CreateQuestionModel,
    conn?: EntityManager,
  ): Promise<QuestionModel>;

  findById(id: number, conn?: EntityManager): Promise<QuestionModel>;

  findAll(): Promise<QuestionModel[]>;

  update(id: number, conn?: EntityManager): Promise<void>;

  delete(id: number, conn?: EntityManager): Promise<void>;

  softDelete(id: number, conn?: EntityManager): Promise<void>;
}
