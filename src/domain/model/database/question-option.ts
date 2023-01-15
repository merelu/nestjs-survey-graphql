import { PickType } from '@nestjs/mapped-types';
import { AnswerModel } from './answer';
import { CommonModel } from './common';
import { QuestionModel } from './question';

export class QuestionOptionModel extends CommonModel {
  optionContent: string;
  score: number;

  questionId: number;
  question: QuestionModel;

  answers: AnswerModel[];
}

export class CreateQuestionOptionModel extends PickType(QuestionOptionModel, [
  'optionContent',
  'score',
  'questionId',
] as const) {}
