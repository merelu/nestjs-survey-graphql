import { CreateSurveyModel } from '@domain/model/database/survey';
import { SurveyType } from '@infra/graphql/type/survey.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSurveyUseCases } from '@usecases/survey/create-survey.usecases';
import { GetSurveyUseCases } from '@usecases/survey/get-survey.usecases';
import { CreateSurveyInput } from './dto/create-survey.input';

@Resolver(() => SurveyType)
export class SurveyResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_SURVEY_USECASES_PROXY)
    private readonly createSurveyUseCasesProxy: UseCaseProxy<CreateSurveyUseCases>,
    @Inject(UseCasesProxyModule.GET_SURVEY_USECASES_PROXY)
    private readonly getSurveyUseCasesProxy: UseCaseProxy<GetSurveyUseCases>,
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
}
