import {
  AnswerOptionModel,
  CreateAnswerOptionModel,
} from '@domain/model/database/answer-option';
import { EntityManager } from 'typeorm';

export interface IAnswerOptionRepository {
  create(
    data: CreateAnswerOptionModel,
    conn?: EntityManager,
  ): Promise<AnswerOptionModel>;

  insertMany(
    data: CreateAnswerOptionModel[],
    conn?: EntityManager,
  ): Promise<boolean>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;

  softDeleteMany(
    answerId: number,
    questionOptionids: number[],
    conn?: EntityManager,
  ): Promise<boolean>;
}
