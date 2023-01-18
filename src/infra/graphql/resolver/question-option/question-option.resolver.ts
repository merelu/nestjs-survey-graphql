import { CreateQuestionOptionModel } from '@domain/model/database/question-option';
import { QuestionOptionType } from '@infra/graphql/type/question-option.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionOptionUseCases } from '@usecases/question-option/create-question-option.usecases';
import { GetQuestionOptionUseCases } from '@usecases/question-option/get-question-option.usecases';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';

@Resolver(() => QuestionOptionType)
export class QuestionOptionResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_QUESTION_OPTION_USECASES_PROXY)
    private readonly createQuestionOptionUseCasesProxy: UseCaseProxy<CreateQuestionOptionUseCases>,
    @Inject(UseCasesProxyModule.GET_QUESTION_OPTION_USECASES_PROXY)
    private readonly getQuestionOptionUseCasesProxy: UseCaseProxy<GetQuestionOptionUseCases>,
  ) {}

  @Query(() => QuestionOptionType)
  async questionOption(@Args('id', { type: () => Int }) id: number) {
    const result = await this.getQuestionOptionUseCasesProxy
      .getInstance()
      .getQuestionOptionDetailById(id);

    return result;
  }

  @Mutation(() => QuestionOptionType)
  async createQuestionOption(
    @Args('createQuestionOptionInput') data: CreateQuestionOptionInput,
  ) {
    const newQuestionOption = new CreateQuestionOptionModel();
    newQuestionOption.optionContent = data.optionContent;
    newQuestionOption.score = data.score;
    newQuestionOption.questionId = data.questionId;

    const result = await this.createQuestionOptionUseCasesProxy
      .getInstance()
      .execute(newQuestionOption);

    return result;
  }
}
