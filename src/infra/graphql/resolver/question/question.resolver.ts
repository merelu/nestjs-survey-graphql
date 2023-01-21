import {
  CreateQuestionModel,
  UpdateQuestionModel,
} from '@domain/model/database/question';
import { QuestionType } from '@infra/graphql/type/question.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionUseCases } from '@usecases/question/create-question.usecases';
import { DeleteQuestionUseCases } from '@usecases/question/delete-question.usecases';
import { GetQuestionUseCases } from '@usecases/question/get-question.usecases';
import { UpdateQuestionOrderUseCases } from '@usecases/question/update-question-order.usecases';
import { UpdateQuestionUseCases } from '@usecases/question/update-question.usecases';
import { DataSource } from 'typeorm';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionOrderInput } from './dto/update-question-order.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => QuestionType)
export class QuestionResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_QUESTION_USECASES_PROXY)
    private readonly createQuestionUseCasesProxy: UseCaseProxy<CreateQuestionUseCases>,
    @Inject(UseCasesProxyModule.GET_QUESTION_USECASES_PROXY)
    private readonly getQuestionUseCasesProxy: UseCaseProxy<GetQuestionUseCases>,
    @Inject(UseCasesProxyModule.DELETE_QUESTION_USECASES_PROXY)
    private readonly deleteQuestionUseCasesProxy: UseCaseProxy<DeleteQuestionUseCases>,
    @Inject(UseCasesProxyModule.UPDATE_QUESTION_USECASES_PROXY)
    private readonly updateQuestionUseCasesProxy: UseCaseProxy<UpdateQuestionUseCases>,
    @Inject(UseCasesProxyModule.UPDATE_QUESTION_ORDER_USECASES_PROXY)
    private readonly updateQuestionOrderUseCasesProxy: UseCaseProxy<UpdateQuestionOrderUseCases>,
    private readonly dataSource: DataSource,
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

  @Mutation(() => QuestionType)
  async updateQuestion(@Args('updateQuestionInput') data: UpdateQuestionInput) {
    const updatedQuestion = new UpdateQuestionModel();
    updatedQuestion.questionContent = data.questionContent;
    updatedQuestion.allowMultipleAnswers = data.allowMultipleAnswers;

    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.updateQuestionUseCasesProxy
        .getInstance()
        .execute(data.questionId, updatedQuestion, connection.manager);
      await connection.commitTransaction();
      return result;
    } catch (err) {
      await connection.rollbackTransaction();
      throw err;
    } finally {
      await connection.release();
    }
  }

  @Mutation(() => String)
  async deleteQuestion(@Args('id', { type: () => Int }) id: number) {
    await this.deleteQuestionUseCasesProxy.getInstance().execute(id);

    return 'Success';
  }

  @Mutation(() => [QuestionType])
  async updateQuestionOrder(
    @Args('updateQuestionOrderInput') data: UpdateQuestionOrderInput,
  ): Promise<QuestionType[]> {
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.updateQuestionOrderUseCasesProxy
        .getInstance()
        .execute(connection.manager, data.curQuestionId, data.nextQuestionId);

      await connection.commitTransaction();
      return result;
    } catch (err) {
      await connection.rollbackTransaction();
      throw err;
    } finally {
      await connection.release();
    }
  }
}
