import {
  CreateQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from '@domain/model/database/question';
import { EntityManager } from 'typeorm';

export interface IQuestionRepository {
  create(
    data: CreateQuestionModel,
    conn?: EntityManager,
  ): Promise<QuestionModel | null>;

  findById(id: number, conn?: EntityManager): Promise<QuestionModel | null>;

  findAll(): Promise<QuestionModel[]>;

  update(
    id: number,
    data: UpdateQuestionModel,
    conn?: EntityManager,
  ): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
