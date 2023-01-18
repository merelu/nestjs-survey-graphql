import { PickType } from '@nestjs/mapped-types';
import { AnswerModel } from './answer';
import { CommonModel } from './common';
import { QuestionModel } from './question';

export interface IQuestionOptionModel {
  id: number;
  optionContent: string;
  score: number;
  order: number;
  questionId: number;
}
export class QuestionOptionModel
  extends CommonModel
  implements IQuestionOptionModel
{
  optionContent: string;
  score: number;
  order: number;

  questionId: number;
  question: QuestionModel;

  answers: AnswerModel[];
}

export class CreateQuestionOptionModel extends PickType(QuestionOptionModel, [
  'optionContent',
  'score',
  'questionId',
  'order',
] as const) {}

export class UpdateQuestionOptionModel extends PickType(QuestionOptionModel, [
  'optionContent',
  'score',
] as const) {}
