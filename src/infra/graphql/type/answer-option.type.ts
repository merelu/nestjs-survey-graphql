import { IAnswerOptionModel } from '@domain/model/database/answer-option';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnswerOptionType implements IAnswerOptionModel {
  @Field(() => ID)
  id: number;

  @Field()
  answerId: number;

  @Field()
  questionOptionId: number;
}
