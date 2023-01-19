import { PickType } from '@nestjs/mapped-types';
import { AnswerOptionModel } from './answer-option';
import { CommonModel } from './common';
import { QuestionModel } from './question';
import { UserSurveyModel } from './user-survey';

export interface IAnswerModel {
  id: number;
  userSurveyId: number;
  questionId: number;
}

export class AnswerModel extends CommonModel implements IAnswerModel {
  userSurveyId: number;
  userSurvey: UserSurveyModel;
  questionId: number;
  question: QuestionModel;
  answerOptions: AnswerOptionModel[];
}

export class CreateAnswerModel extends PickType(AnswerModel, [
  'userSurveyId',
  'questionId',
] as const) {}
