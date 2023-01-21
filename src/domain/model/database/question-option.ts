import { PartialType, PickType } from '@nestjs/mapped-types';
import { AnswerOptionModel } from './answer-option';
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

  answerOptions: AnswerOptionModel[];
}

export class CreateQuestionOptionModel extends PickType(QuestionOptionModel, [
  'optionContent',
  'score',
  'questionId',
  'order',
] as const) {}

export class UpdateQuestionOptionModel extends PartialType(
  PickType(CreateQuestionOptionModel, ['optionContent', 'score'] as const),
) {}
