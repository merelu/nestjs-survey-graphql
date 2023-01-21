import { Field, ObjectType } from '@nestjs/graphql';
import { AnswerType } from './answer.type';
import { SurveyType } from './survey.type';

@ObjectType()
export class CompletedSurveyResultType {
  @Field()
  sumScore: number;

  @Field(() => SurveyType)
  survey: SurveyType;

  @Field(() => [AnswerType])
  answers: AnswerType[];
}
