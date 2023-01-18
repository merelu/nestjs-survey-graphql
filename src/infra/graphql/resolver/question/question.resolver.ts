import { CreateQuestionModel } from '@domain/model/database/question';
import { QuestionType } from '@infra/graphql/type/question.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionUseCases } from '@usecases/question/create-question.usecases';
import { GetQuestionUseCases } from '@usecases/question/get-question.usecases';
import { CreateQuestionInput } from './dto/create-question.input';

@Resolver(() => QuestionType)
export class QuestionResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_QUESTION_USECASES_PROXY)
    private readonly createQuestionUseCasesProxy: UseCaseProxy<CreateQuestionUseCases>,
    @Inject(UseCasesProxyModule.GET_QUESTION_USECASES_PROXY)
    private readonly getQuestionUseCasesProxy: UseCaseProxy<GetQuestionUseCases>,
  ) {}

  @Query(() => QuestionType)
  async question(@Args('id', { type: () => Int }) id: number) {
    const result = await this.getQuestionUseCasesProxy
      .getInstance()
      .getQuestionDetailById(id);

    return result;
  }

  @Mutation(() => QuestionType)
  async createQuestion(@Args('createQuestionInput') data: CreateQuestionInput) {
    const newQuestion = new CreateQuestionModel();
    newQuestion.surveyId = data.surveyId;
    newQuestion.questionContent = data.questionContent;
    newQuestion.allowMultipleAnswers = data.allowMultipleAnswers;

    const result = await this.createQuestionUseCasesProxy
      .getInstance()
      .execute(newQuestion);

    return result;
  }
}
