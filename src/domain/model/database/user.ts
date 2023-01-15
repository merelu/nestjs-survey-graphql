import { AnswerModel } from './answer';
import { CommonModel } from './common';
import { UserSurveyModel } from './user-survey';

export class UserModel extends CommonModel {
  name: string;

  userSurveys: UserSurveyModel[];

  answers: AnswerModel[];
}
