import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerSurveyInput {
  @Field()
  userId: number;

  @Field()
  surveyId: number;
}
