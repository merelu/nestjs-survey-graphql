import {
  CreateQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from '@domain/model/database/question';
import { EntityManager, FindOptionsWhere } from 'typeorm';

export interface IQuestionRepository {
  create(
    data: CreateQuestionModel,
    conn?: EntityManager,
  ): Promise<QuestionModel>;

  findOneById(id: number, conn?: EntityManager): Promise<QuestionModel | null>;

  findDetailById(
    id: number,
    conn?: EntityManager,
  ): Promise<QuestionModel | null>;

  findOneByQueryWithRelation(
    query: FindOptionsWhere<QuestionModel>,
    relations: string[],
  ): Promise<QuestionModel | null>;

  findAll(): Promise<QuestionModel[]>;

  getNextOrder(surveyId: number): Promise<number>;

  update(
    id: number,
    data: UpdateQuestionModel,
    conn?: EntityManager,
  ): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
