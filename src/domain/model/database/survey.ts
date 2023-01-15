import { CommonModel } from './common';
import { QuestionModel } from './question';
import { UserSurveyModel } from './user-survey';

export class SurveyModel extends CommonModel {
  title: string;
  description: string;
  footer: string;

  userSurveys: UserSurveyModel[];
  questions: QuestionModel[];
}
