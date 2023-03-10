import { PickType } from '@nestjs/mapped-types';
import { AnswerModel } from './answer';
import { CommonModel } from './common';
import { SurveyModel } from './survey';
import { UserModel } from './user';

export interface IUserSurveyModel {
  id: number;
  isDone: boolean;
  userId: number;
  surveyId: number;
}

export class UserSurveyModel extends CommonModel implements IUserSurveyModel {
  isDone: boolean;
  userId: number;
  user: UserModel;
  surveyId: number;
  survey: SurveyModel;
  answers: AnswerModel[];
}

export class CreateUserSurveyModel extends PickType(UserSurveyModel, [
  'userId',
  'surveyId',
] as const) {}
