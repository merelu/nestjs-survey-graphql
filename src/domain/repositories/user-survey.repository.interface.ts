import {
  CreateUserSurveyModel,
  UserSurveyModel,
} from '@domain/model/database/user-survey';
import { EntityManager } from 'typeorm';

export interface IUserSurveyRepository {
  create(
    data: CreateUserSurveyModel,
    conn?: EntityManager,
  ): Promise<UserSurveyModel>;

  delete(id: number, conn?: EntityManager): Promise<void>;

  softDelete(id: number, conn?: EntityManager): Promise<void>;
}
