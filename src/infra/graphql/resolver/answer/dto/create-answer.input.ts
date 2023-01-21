import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  userSurveyId: number;

  @Field()
  questionId: number;

  @Field(() => [Int])
  questionOptionIds: number[];
}
