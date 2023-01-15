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
