import {
  CreateUserSurveyModel,
  UserSurveyModel,
} from '@domain/model/database/user-survey';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export interface IUserSurveyRepository {
  create(data: CreateUserSurveyModel): Promise<UserSurveyModel>;

  findOneByQueryWithRelation(
    query: FindOptionsWhere<UserSurveyModel>,
    relations: string[],
    order?: FindOptionsOrder<UserSurveyModel>,
  ): Promise<UserSurveyModel | null>;

  getSumScoreByUserSurveyId(userSurveyId: number): Promise<number>;

  updateIsDone(id: number, isDone: boolean): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
