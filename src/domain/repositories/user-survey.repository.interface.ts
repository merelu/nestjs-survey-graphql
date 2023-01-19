import {
  CreateUserSurveyModel,
  UserSurveyModel,
} from '@domain/model/database/user-survey';
import { FindOptionsWhere } from 'typeorm';

export interface IUserSurveyRepository {
  create(data: CreateUserSurveyModel): Promise<UserSurveyModel>;

  findOneByQueryWithRelation(
    query: FindOptionsWhere<UserSurveyModel>,
    relations?: string[],
  ): Promise<UserSurveyModel | null>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
