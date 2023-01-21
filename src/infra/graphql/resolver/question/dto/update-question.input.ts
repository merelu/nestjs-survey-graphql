import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { CreateQuestionInput } from './create-question.input';

@InputType()
export class UpdateQuestionInput extends PartialType(
  PickType(CreateQuestionInput, [
    'questionContent',
    'allowMultipleAnswers',
  ] as const),
) {
  @Field(() => Int)
  questionId: number;
}
