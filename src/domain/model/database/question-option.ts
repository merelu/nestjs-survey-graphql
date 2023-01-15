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
