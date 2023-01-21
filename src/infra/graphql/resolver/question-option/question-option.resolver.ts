import {
  CreateQuestionOptionModel,
  UpdateQuestionOptionModel,
} from '@domain/model/database/question-option';
import { QuestionOptionType } from '@infra/graphql/type/question-option.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateQuestionOptionUseCases } from '@usecases/question-option/create-question-option.usecases';
import { DeleteQuestionOptionUseCases } from '@usecases/question-option/delete-question-option.usecases';
import { GetQuestionOptionUseCases } from '@usecases/question-option/get-question-option.usecases';
import { UpdateQuestionOptionOrderUseCases } from '@usecases/question-option/update-question-option-order.usecases';
import { UpdateQuestionOptionUseCases } from '@usecases/question-option/update-question-option.usecases';
import { DataSource } from 'typeorm';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionOrderInput } from './dto/update-question-option-order.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';

@Resolver(() => QuestionOptionType)
export class QuestionOptionResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_QUESTION_OPTION_USECASES_PROXY)
    private readonly createQuestionOptionUseCasesProxy: UseCaseProxy<CreateQuestionOptionUseCases>,
    @Inject(UseCasesProxyModule.GET_QUESTION_OPTION_USECASES_PROXY)
    private readonly getQuestionOptionUseCasesProxy: UseCaseProxy<GetQuestionOptionUseCases>,
    @Inject(UseCasesProxyModule.DELETE_QUESTION_OPTION_USECASES_PROXY)
    private readonly deleteQuestionOptionUseCasesProxy: UseCaseProxy<DeleteQuestionOptionUseCases>,
    @Inject(UseCasesProxyModule.UPDATE_QUESTION_OPTION_USECASES_PROXY)
    private readonly updateQuestionOptionUseCasesProxy: UseCaseProxy<UpdateQuestionOptionUseCases>,
    @Inject(UseCasesProxyModule.UPDATE_QUESTION_OPTION_ORDER_USECASES_PROXY)
    private readonly updateQuestionOptionOrderUseCasesProxy: UseCaseProxy<UpdateQuestionOptionOrderUseCases>,
    private readonly dataSource: DataSource,
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

  @Mutation(() => QuestionOptionType)
  async updateQuestionOption(
    @Args('updateQuestionOptionInput') data: UpdateQuestionOptionInput,
  ) {
    const updatedQuestionOption = new UpdateQuestionOptionModel();
    updatedQuestionOption.optionContent = data.optionContent;
    updatedQuestionOption.score = data.score;

    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.updateQuestionOptionUseCasesProxy
        .getInstance()
        .execute(
          data.questionOptionId,
          updatedQuestionOption,
          connection.manager,
        );
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
  async deleteQuestionOption(@Args('id', { type: () => Int }) id: number) {
    await this.deleteQuestionOptionUseCasesProxy.getInstance().execute(id);
    return 'Success';
  }

  @Mutation(() => [QuestionOptionType])
  async updateQuestionOptionOrder(
    @Args('updateQuestionOptionOrderInput')
    data: UpdateQuestionOptionOrderInput,
  ): Promise<QuestionOptionType[]> {
    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.updateQuestionOptionOrderUseCasesProxy
        .getInstance()
        .execute(
          connection.manager,
          data.curQuestionOptionId,
          data.nextQuestionOptionId,
        );

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
