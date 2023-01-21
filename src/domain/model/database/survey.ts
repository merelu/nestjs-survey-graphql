import { PartialType, PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { QuestionModel } from './question';
import { UserSurveyModel } from './user-survey';

export interface ISurveyModel {
  id: number;
  title: string;
  description: string;
  footer: string;
}

export class SurveyModel extends CommonModel implements ISurveyModel {
  title: string;
  description: string;
  footer: string;

  userSurveys: UserSurveyModel[];
  questions: QuestionModel[];
}

export class CreateSurveyModel extends PickType(SurveyModel, [
  'title',
  'description',
  'footer',
] as const) {}

export class UpdateSurveyModel extends PartialType(CreateSurveyModel) {}
