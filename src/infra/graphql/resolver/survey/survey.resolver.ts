import {
  CreateSurveyModel,
  UpdateSurveyModel,
} from '@domain/model/database/survey';
import { SurveyType } from '@infra/graphql/type/survey.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSurveyUseCases } from '@usecases/survey/create-survey.usecases';
import { DeleteSurveyUseCases } from '@usecases/survey/delete-survey.usecases';
import { GetSurveyUseCases } from '@usecases/survey/get-survey.usecases';
import { UpdateSurveyUseCases } from '@usecases/survey/update-survey.usecases';
import { DataSource } from 'typeorm';
import { CreateSurveyInput } from './dto/create-survey.input';
import { UpdateSurveyInput } from './dto/update-survey.input';

@Resolver(() => SurveyType)
export class SurveyResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_SURVEY_USECASES_PROXY)
    private readonly createSurveyUseCasesProxy: UseCaseProxy<CreateSurveyUseCases>,
    @Inject(UseCasesProxyModule.GET_SURVEY_USECASES_PROXY)
    private readonly getSurveyUseCasesProxy: UseCaseProxy<GetSurveyUseCases>,
    @Inject(UseCasesProxyModule.UPDATE_SURVEY_USECASES_PROXY)
    private readonly updateSurveyUseCasesProxy: UseCaseProxy<UpdateSurveyUseCases>,
    @Inject(UseCasesProxyModule.DELETE_SURVEY_USECASES_PROXY)
    private readonly deleteSurveyUseCasesProxy: UseCaseProxy<DeleteSurveyUseCases>,

    private readonly dataSource: DataSource,
  ) {}

  @Query(() => SurveyType)
  async survey(@Args('id', { type: () => Int }) id: number) {
    const result = await this.getSurveyUseCasesProxy
      .getInstance()
      .getSurveyDetailById(id);

    return result;
  }

  @Query(() => [SurveyType])
  async surveys(): Promise<SurveyType[]> {
    const result = await this.getSurveyUseCasesProxy.getInstance().getSurveys();

    return result;
  }

  @Mutation(() => SurveyType)
  async createSurvey(
    @Args('creatSurveyInput') data: CreateSurveyInput,
  ): Promise<SurveyType> {
    const newSurvey = new CreateSurveyModel();
    newSurvey.title = data.title;
    newSurvey.description = data.description;
    newSurvey.footer = data.footer;

    const result = await this.createSurveyUseCasesProxy
      .getInstance()
      .execute(newSurvey);

    return result;
  }

  @Mutation(() => SurveyType)
  async updateSurvey(
    @Args('updateSurveyInput') data: UpdateSurveyInput,
  ): Promise<SurveyType> {
    const updatedSurvey = new UpdateSurveyModel();
    updatedSurvey.title = data.title;
    updatedSurvey.description = data.description;
    updatedSurvey.footer = data.footer;

    const connection = this.dataSource.createQueryRunner();
    await connection.connect();
    await connection.startTransaction();
    try {
      const result = await this.updateSurveyUseCasesProxy
        .getInstance()
        .execute(data.surveyId, updatedSurvey, connection.manager);
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
  async deleteSurvey(@Args('id', { type: () => Int }) id: number) {
    await this.deleteSurveyUseCasesProxy.getInstance().execute(id);

    return 'Success';
  }
}
