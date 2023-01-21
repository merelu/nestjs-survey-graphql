import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { CreateQuestionOptionInput } from './create-question-option.input';

@InputType()
export class UpdateQuestionOptionInput extends PartialType(
  PickType(CreateQuestionOptionInput, ['score', 'optionContent'] as const),
) {
  @Field(() => Int)
  questionOptionId: number;
}
