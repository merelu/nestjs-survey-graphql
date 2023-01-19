import { CreateAnswerModel } from '@domain/model/database/answer';
import { AnswerType } from '@infra/graphql/type/answer.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswerQuestionUseCases } from '@usecases/question/answer-question.usecases';
import { DataSource } from 'typeorm';
import { AnswerQuestionInput } from './dto/answer-question.input';

@Resolver(() => AnswerType)
export class AnswerResolver {
  constructor(
    @Inject(UseCasesProxyModule.ANSWER_QUESTION_USECASES_PROXY)
    private readonly answerQuestionUseCasesProxy: UseCaseProxy<AnswerQuestionUseCases>,
    private readonly dataSource: DataSource,
  ) {}

  @Mutation(() => AnswerType)
  async answerQuestion(@Args('answerQuestionInput') data: AnswerQuestionInput) {
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
}
