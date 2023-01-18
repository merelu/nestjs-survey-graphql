import { PickType } from '@nestjs/mapped-types';
import { CommonModel } from './common';
import { QuestionOptionModel } from './question-option';
import { UserModel } from './user';

export interface IAnswerModel {
  id: number;
  userId: number;
  questionOptionId: number;
}

export class AnswerModel extends CommonModel implements IAnswerModel {
  userId: number;
  user: UserModel;
  questionOptionId: number;
  questionOption: QuestionOptionModel;
}

export class CreateAnswerModel extends PickType(AnswerModel, [
  'userId',
  'questionOptionId',
] as const) {}
