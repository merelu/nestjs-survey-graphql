import { CreateUserSurveyModel } from '@domain/model/database/user-survey';
import { CheckCompleteSurveyType } from '@infra/graphql/type/check-complete-survey.type';
import { SurveyResultType } from '@infra/graphql/type/survey-result.type';
import { UserSurveyType } from '@infra/graphql/type/user-survey.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerSurveyUseCases } from '@usecases/user/answer-survey.usecases';
import { GetCompletedSurveyUseCases } from '@usecases/survey/get-completed-survey.usecases';
import { AnswerSurveyInput } from './dto/answer-survey.input';
import { CompleteSurveyUseCases } from '@usecases/survey/complete-survey.usecases';

@Resolver(() => UserSurveyType)
export class UserSurveyResolver {
  constructor(
    @Inject(UseCasesProxyModule.ANSWER_SURVEY_USECASES_PROXY)
    private readonly answerSurveyUseCasesProxy: UseCaseProxy<AnswerSurveyUseCases>,
    @Inject(UseCasesProxyModule.COMPLETE_SURVEY_USECASES_PROXY)
    private readonly completeSurveyUseCasesProxy: UseCaseProxy<CompleteSurveyUseCases>,
    @Inject(UseCasesProxyModule.GET_COMPLETED_SURVEY_USECASES_PROXY)
    private readonly getCompletedSurveyUseCasesProxy: UseCaseProxy<GetCompletedSurveyUseCases>,
  ) {}

  @Query(() => SurveyResultType)
  async surveyResult(
    @Args('userSurveyId', { type: () => Int }) userSurveyId: number,
  ) {
    const result = await this.getCompletedSurveyUseCasesProxy
      .getInstance()
      .execute(userSurveyId);

    return {
      sumScore: result.sumScore,
      survey: result.userSurvey.survey,
      answers: result.userSurvey.answers,
    } as SurveyResultType;
  }

  @Mutation(() => UserSurveyType)
  async answerSurvey(@Args('answerSurveyInput') data: AnswerSurveyInput) {
    const newUserSurvey = new CreateUserSurveyModel();
    newUserSurvey.userId = data.userId;
    newUserSurvey.surveyId = data.surveyId;

    const usecases = this.answerSurveyUseCasesProxy.getInstance();

    const result = await usecases.execute(newUserSurvey);

    return result;
  }

  @Mutation(() => CheckCompleteSurveyType)
  async completeSurvey(
    @Args('userSurveyId', { type: () => Int }) userSurveyId: number,
  ) {
    const result = await this.completeSurveyUseCasesProxy
      .getInstance()
      .execute(userSurveyId);
    return {
      isDone: result.length > 0 ? false : true,
      inCompletedQuestionIds: result,
    } as CheckCompleteSurveyType;
  }
}
