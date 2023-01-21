import {
  CreateQuestionOptionModel,
  QuestionOptionModel,
  UpdateQuestionOptionModel,
} from '@domain/model/database/question-option';
import { EntityManager } from 'typeorm';

export interface IQuestionOptionRepository {
  create(
    data: CreateQuestionOptionModel,
    conn?: EntityManager,
  ): Promise<QuestionOptionModel>;

  findOneById(
    id: number,
    conn?: EntityManager,
  ): Promise<QuestionOptionModel | null>;

  findAll(): Promise<QuestionOptionModel[]>;

  findByQuestionIdWithRelation(
    questionId: number,
    conn?: EntityManager,
  ): Promise<QuestionOptionModel[]>;

  getNextOrder(questionId: number): Promise<number>;

  update(
    id: number,
    data: UpdateQuestionOptionModel,
    conn?: EntityManager,
  ): Promise<void>;

  udpateOrderById(
    questionOptionId: number,
    updateOrder: number,
    conn?: EntityManager,
  ): Promise<void>;

  incrementOrdersByQuestionId(
    questionId: number,
    from: number,
    conn?: EntityManager,
  ): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
