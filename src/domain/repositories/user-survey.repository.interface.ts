import { CreateUserSurveyModel } from '@domain/model/database/user-survey';

export interface IUserSurveyRepository {
  create(data: CreateUserSurveyModel): Promise<boolean>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
