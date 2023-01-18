import { IQuestionOptionModel } from '@domain/model/database/question-option';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuestionOptionType implements IQuestionOptionModel {
  @Field(() => ID)
  id: number;

  @Field()
  optionContent: string;

  @Field()
  score: number;

  @Field()
  order: number;

  @Field()
  questionId: number;
}
