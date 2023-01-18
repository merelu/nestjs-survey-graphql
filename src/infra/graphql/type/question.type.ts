import { IQuestionModel } from '@domain/model/database/question';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionOptionType } from './question-option.type';

@ObjectType()
export class QuestionType implements IQuestionModel {
  @Field(() => ID)
  id: number;

  @Field()
  questionContent: string;

  @Field()
  allowMultipleAnswers: boolean;

  @Field()
  surveyId: number;

  @Field()
  order: number;

  @Field(() => [QuestionOptionType])
  questionOptions: QuestionOptionType[];
}
