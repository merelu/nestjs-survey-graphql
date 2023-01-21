import { IAnswerOptionModel } from '@domain/model/database/answer-option';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionOptionType } from './question-option.type';

@ObjectType()
export class AnswerOptionType implements IAnswerOptionModel {
  @Field(() => Int)
  id: number;

  @Field()
  answerId: number;

  @Field()
  questionOptionId: number;

  @Field(() => QuestionOptionType, { nullable: true })
  questionOption: QuestionOptionType;
}
