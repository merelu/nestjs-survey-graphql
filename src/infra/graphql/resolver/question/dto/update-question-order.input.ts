import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionOrderInput {
  @Field(() => Int)
  curQuestionId: number;

  @Field(() => Int, { nullable: true })
  nextQuestionId: number;
}
