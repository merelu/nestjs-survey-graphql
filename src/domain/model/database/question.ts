import { PartialType, PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { QuestionOptionModel } from './question-option';
import { SurveyModel } from './survey';

export interface IQuestionModel {
  id: number;
  questionContent: string;
  allowMultipleAnswers: boolean;
  order: number;

  surveyId: number;
}

export class QuestionModel extends CommonModel implements IQuestionModel {
  questionContent: string;
  allowMultipleAnswers: boolean;
  order: number;

  surveyId: number;
  survey: SurveyModel;

  questionOptions: QuestionOptionModel[];
}

export class CreateQuestionModel extends PickType(QuestionModel, [
  'questionContent',
  'allowMultipleAnswers',
  'surveyId',
  'order',
] as const) {}

export class UpdateQuestionModel extends PartialType(
  PickType(CreateQuestionModel, [
    'questionContent',
    'allowMultipleAnswers',
  ] as const),
) {}
