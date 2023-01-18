import { ISurveyModel } from '@domain/model/database/survey';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionType } from './question.type';

@ObjectType()
export class SurveyType implements ISurveyModel {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  footer: string;

  @Field(() => [QuestionType])
  questions: QuestionType[];
}
