import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionOptionOrderInput {
  @Field(() => Int)
  curQuestionOptionId: number;

  @Field(() => Int, { nullable: true })
  nextQuestionOptionId: number;
}
