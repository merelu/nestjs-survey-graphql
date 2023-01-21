import { Field, ObjectType } from '@nestjs/graphql';
import { AnswerType } from './answer.type';
import { SurveyType } from './survey.type';

@ObjectType()
export class SurveyResultType {
  @Field({ nullable: true })
  sumScore: number;

  @Field(() => SurveyType, { nullable: true })
  survey: SurveyType;

  @Field(() => [AnswerType], { nullable: true })
  answers: AnswerType[];
}
