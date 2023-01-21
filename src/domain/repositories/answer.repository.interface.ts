import { CreateAnswerModel, AnswerModel } from '@domain/model/database/answer';
import { EntityManager, FindOptionsWhere } from 'typeorm';

export interface IAnswerRepository {
  create(data: CreateAnswerModel, conn?: EntityManager): Promise<AnswerModel>;

  findOneById(id: number, conn?: EntityManager): Promise<AnswerModel | null>;

  findOneByQueryWithRelation(
    query: FindOptionsWhere<AnswerModel>,
    relations: string[],
    conn?: EntityManager,
  ): Promise<AnswerModel | null>;

  findByUserSurveyId(userSurveyId: number): Promise<AnswerModel[]>;

  delete(id: number, conn?: EntityManager): Promise<boolean>;

  softDelete(id: number, conn?: EntityManager): Promise<boolean>;
}
