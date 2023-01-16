import { PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { SurveyModel } from './survey';
import { UserModel } from './user';

export class UserSurveyModel extends CommonModel {
  userId: number;
  user: UserModel;
  surveyId: number;
  survey: SurveyModel;
}

export class CreateUserSurveyModel extends PickType(UserSurveyModel, [
  'userId',
  'surveyId',
] as const) {}