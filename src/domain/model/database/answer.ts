import { PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { QuestionOptionModel } from './question-option';
import { UserModel } from './user';

export class AnswerModel extends CommonModel {
  userId: number;
  user: UserModel;
  questionOptionId: number;
  questionOption: QuestionOptionModel;
}

export class CreateAnswerModel extends PickType(AnswerModel, [
  'userId',
  'questionOptionId',
] as const) {}
