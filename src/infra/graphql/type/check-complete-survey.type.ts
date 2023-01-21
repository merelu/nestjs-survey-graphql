import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CheckCompleteSurveyType {
  @Field()
  isDone: boolean;

  @Field(() => [Number])
  inCompletedQuestionIds: number[];
}
