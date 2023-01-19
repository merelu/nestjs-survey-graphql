import { IAnswerModel } from '@domain/model/database/answer';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AnswerOptionType } from './answer-option.type';

@ObjectType()
export class AnswerType implements IAnswerModel {
  @Field(() => ID)
  id: number;

  @Field()
  questionId: number;

  @Field()
  userSurveyId: number;

  @Field(() => [AnswerOptionType])
  answerOptions: AnswerOptionType[];
}
