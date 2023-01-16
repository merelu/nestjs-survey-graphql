import { PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { QuestionOptionModel } from './question-option';
import { SurveyModel } from './survey';

export class QuestionModel extends CommonModel {
  questionContent: string;
  allowMultipleAnswers: boolean;

  surveyId: number;
  survey: SurveyModel;

  questionOptions: QuestionOptionModel[];
}

export class CreateQuestionModel extends PickType(QuestionModel, [
  'questionContent',
  'allowMultipleAnswers',
  'surveyId',
] as const) {}

export class UpdateQuestionModel extends PickType(QuestionModel, [
  'questionContent',
  'allowMultipleAnswers',
] as const) {}
