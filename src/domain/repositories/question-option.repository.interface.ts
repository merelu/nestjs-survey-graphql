import {
  CreateQuestionOptionModel,
  QuestionOptionModel,
} from '@domain/model/database/question-option';
import { EntityManager } from 'typeorm';

export interface IQuestionOptionRepository {
  create(
    data: CreateQuestionOptionModel,
    conn?: EntityManager,
  ): Promise<QuestionOptionModel>;

  findById(id: number, conn?: EntityManager): Promise<QuestionOptionModel>;

  findAll(): Promise<QuestionOptionModel[]>;

  update(id: number, conn?: EntityManager): Promise<void>;

  delete(id: number, conn?: EntityManager): Promise<void>;

  softDelete(id: number, conn?: EntityManager): Promise<void>;
}
