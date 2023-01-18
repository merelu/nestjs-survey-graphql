import { PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { SurveyModel } from './survey';
import { UserModel } from './user';

export interface IUserSurveyModel {
  id: number;
  userId: number;
  surveyId: number;
}

export class UserSurveyModel extends CommonModel implements IUserSurveyModel {
  userId: number;
  user: UserModel;
  surveyId: number;
  survey: SurveyModel;
}

export class CreateUserSurveyModel extends PickType(UserSurveyModel, [
  'userId',
  'surveyId',
] as const) {}
