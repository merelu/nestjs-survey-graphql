import {
  CreateSurveyModel,
  SurveyModel,
  UpdateSurveyModel,
} from '@domain/model/database/survey';
import { EntityManager } from 'typeorm';

export interface ISurveyRepository {
  create(data: CreateSurveyModel, conn?: EntityManager): Promise<SurveyModel>;

  findOneById(id: number, conn?: EntityManager): Promise<SurveyModel | null>;

  findDetailById(id: number, conn?: EntityManager): Promise<SurveyModel | null>;

  findAll(): Promise<SurveyModel[]>;

  update(
    id: number,
    data: UpdateSurveyModel,
    conn?: EntityManager,
  ): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
