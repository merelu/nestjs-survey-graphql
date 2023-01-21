import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateSurveyInput {
  @Field()
  @IsString()
  @Length(1, 255)
  @IsNotEmpty()
  title: string;

  @Field()
  description: string;

  @Field()
  footer: string;
}
