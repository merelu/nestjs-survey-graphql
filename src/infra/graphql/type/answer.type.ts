import { IAnswerModel } from '@domain/model/database/answer';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnswerType implements IAnswerModel {
  @Field(() => ID)
  id: number;

  @Field()
  userId: number;

  @Field()
  questionOptionId: number;
}
