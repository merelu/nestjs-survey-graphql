import { PickType } from '@nestjs/mapped-types';
import { AnswerModel } from './answer';
import { CommonModel } from './common';
import { QuestionOptionModel } from './question-option';

export interface IAnswerOptionModel {
  id: number;
  answerId: number;
  questionOptionId: number;
}

export class AnswerOptionModel
  extends CommonModel
  implements IAnswerOptionModel
{
  answerId: number;
  answer: AnswerModel;
  questionOptionId: number;
  questionOption: QuestionOptionModel;
}

export class CreateAnswerOptionModel extends PickType(AnswerOptionModel, [
  'answerId',
  'questionOptionId',
] as const) {}
