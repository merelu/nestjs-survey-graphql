import { CreateUserSurveyModel } from '@domain/model/database/user-survey';
import { UserSurveyType } from '@infra/graphql/type/user-survey.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswerSurveyUseCases } from '@usecases/user/answer-survey.usecases';
import { AnswerSurveyInput } from './dto/answer-survey.input';

@Resolver(() => UserSurveyType)
export class UserSurveyResolver {
  constructor(
    @Inject(UseCasesProxyModule.ANSWER_SURVEY_USECASES_PROXY)
    private readonly answerSurveyUseCasesProxy: UseCaseProxy<AnswerSurveyUseCases>,
  ) {}

  @Mutation(() => UserSurveyType)
  async answerSurvey(@Args('answerSurveyInput') data: AnswerSurveyInput) {
    const newUserSurvey = new CreateUserSurveyModel();
    newUserSurvey.userId = data.userId;
    newUserSurvey.surveyId = data.surveyId;

    const usecases = this.answerSurveyUseCasesProxy.getInstance();

    const result = await usecases.execute(newUserSurvey);

    return result;
  }
}
