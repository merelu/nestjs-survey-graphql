import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateSurveyInput {
  @Field()
  @Length(1, 255)
  title: string;

  @Field()
  description: string;

  @Field()
  footer: string;
}
