import { CommonModel } from './common';
import { QuestionOptionModel } from './question-option';
import { UserModel } from './user';

export class AnswerModel extends CommonModel {
  userId: number;
  user: UserModel;
  questionOptionId: number;
  questionOption: QuestionOptionModel;
}
