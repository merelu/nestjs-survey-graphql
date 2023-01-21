import { CreateAnswerModel } from '@domain/model/database/answer';
import { AnswerType } from '@infra/graphql/type/answer.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateAnswerUseCases } from '@usecases/answer/create-answer.usecases';
import { DeleteAnswerUseCases } from '@usecases/answer/delete-answer.usecases';
import { GetAnswerUseCases } from '@usecases/answer/get-answer.usecases';
import { UpdateAnswerUseCases } from '@usecases/answer/udpate-answer.usecases';
import { DataSource } from 'typeorm';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';

@Resolver(() => AnswerType)
export class AnswerResolver {
  constructor(
    @Inject(UseCasesProxyModule.GET_ANSWER_USECASES_PROXY)
    private readonly getAnswerUseCasesProxy: UseCaseProxy<GetAnswerUseCases>,
    @Inject(UseCasesProxyModule.CREATE_ANSWER_USECASES_PROXY)
    private readonly answerQuestionUseCasesProxy: UseCaseProxy<CreateAnswerUseCases>,
    @Inject(UseCasesProxyModule.UPDATE_ANSWER_USECASES_PROXY)
    private readonly updateAnswerUseCasesProxy: UseCaseProxy<UpdateAnswerUseCases>,
    @Inject(UseCasesProxyModule.DELETE_ANSWER_USECASES_PROXY)
    private readonly deleteAnswerUseCasesProxy: UseCaseProxy<DeleteAnswerUseCases>,
    private readonly dataSource: DataSource,
  ) {}

  @Query(() => AnswerType)
  async answer(@Args('id', { type: () => Int }) id: number) {
    const result = await this.getAnswerUseCasesProxy
      .getInstance()
      .getAnswerDetailById(id);

    return result;
  }

  @Mutation(() => AnswerType)
  async createAnswer(@Args('createAnswerInput') data: CreateAnswerInput) {
    const newAnswer = new CreateAnswerModel();
    newAnswer.questionId = data.questionId;
    newAnswer.userSurveyId = data.userSurveyId;

    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.answerQuestionUseCasesProxy
        .getInstance()
        .execute(newAnswer, data.questionOptionIds, connection.manager);
      await connection.commitTransaction();
      return result;
    } catch (err) {
      await connection.rollbackTransaction();
      throw err;
    } finally {
      await connection.release();
    }
  }

  @Mutation(() => AnswerType)
  async updateAnswer(@Args('updateAnswerInput') data: UpdateAnswerInput) {
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.updateAnswerUseCasesProxy
        .getInstance()
        .execute(data.answerId, data.questionOptionIds, connection.manager);
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
  async deleteAnswer(@Args('id', { type: () => Int }) id: number) {
    await this.deleteAnswerUseCasesProxy.getInstance().execute(id);

    return 'Success';
  }
}
