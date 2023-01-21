import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int)
  answerId: number;

  @Field(() => [Int])
  questionOptionIds: number[];
}
