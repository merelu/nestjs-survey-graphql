import { createSurveyModel, SurveyModel } from '@domain/model/database/survey';
import { EntityManager } from 'typeorm';

export interface ISurveyRepository {
  create(data: createSurveyModel, conn?: EntityManager): Promise<SurveyModel>;

  findById(id: number, conn?: EntityManager): Promise<SurveyModel>;

  findAll(): Promise<SurveyModel[]>;

  update(id: number, conn?: EntityManager): Promise<void>;

  delete(id: number, conn?: EntityManager): Promise<void>;

  softDelete(id: number, conn?: EntityManager): Promise<void>;
}
