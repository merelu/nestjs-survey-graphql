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

  findBySurveyIdWithRelation(
    surveyId: number,
    conn?: EntityManager,
  ): Promise<QuestionModel[]>;

  findBySurveyIdWithRelation(surveyId: number): Promise<QuestionModel[]>;

  getNextOrder(surveyId: number): Promise<number>;

  update(
    id: number,
    data: UpdateQuestionModel,
    conn?: EntityManager,
  ): Promise<void>;

  udpateOrderById(
    questionId: number,
    updateOrder: number,
    conn?: EntityManager,
  ): Promise<void>;

  incrementOrdersBySurveyId(
    surveyId: number,
    from: number,
    conn?: EntityManager,
  ): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
