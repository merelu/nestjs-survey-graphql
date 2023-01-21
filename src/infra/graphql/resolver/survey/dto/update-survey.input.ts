import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateSurveyInput } from './create-survey.input';

@InputType()
export class UpdateSurveyInput extends PartialType(CreateSurveyInput) {
  @Field(() => Int)
  surveyId: number;
}
