import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field()
  @Length(1, 255)
  questionContent: string;

  @Field()
  allowMultipleAnswers: boolean;

  @Field()
  surveyId: number;
}
