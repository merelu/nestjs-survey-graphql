import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateQuestionOptionInput {
  @Field()
  @Length(1, 255)
  optionContent: string;

  @Field()
  score: number;

  @Field()
  questionId: number;
}
