import { ISurveyModel } from '@domain/model/database/survey';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionType } from './question.type';

@ObjectType()
export class SurveyType implements ISurveyModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  footer: string;

  @Field(() => [QuestionType], { nullable: true })
  questions: QuestionType[];
}
