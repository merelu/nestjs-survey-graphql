import { EnvironmentConfigModule } from '@infra/config/environment-config/environment-config.module';
import { DatabaseAnswerOptionRepository } from '@infra/repositories/answer-option.repository';
import { DatabaseAnswerRepository } from '@infra/repositories/answer.repository';
import { DatabaseQuestionOptionRepository } from '@infra/repositories/question-option.repository';
import { DatabaseQuestionRepository } from '@infra/repositories/question.repository';
import { RepositoriesModule } from '@infra/repositories/repositories.module';
import { DatabaseSurveyRepository } from '@infra/repositories/survey.repository';
import { DatabaseUserSurveyRepository } from '@infra/repositories/user-survey.repository';
import { DatabaseUserRepository } from '@infra/repositories/user.repository';
import { ExceptionModule } from '@infra/services/exceptions/exception.module';
import { ExceptionService } from '@infra/services/exceptions/exception.service';
import { LoggerModule } from '@infra/services/logger/logger.module';
import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { CreateQuestionOptionUseCases } from '@usecases/question-option/create-question-option.usecases';
import { GetQuestionOptionUseCases } from '@usecases/question-option/get-question-option.usecases';
import { AnswerQuestionUseCases } from '@usecases/question/answer-question.usecases';
import { CreateQuestionUseCases } from '@usecases/question/create-question.usecases';
import { GetQuestionUseCases } from '@usecases/question/get-question.usecases';
import { CreateSurveyUseCases } from '@usecases/survey/create-survey.usecases';
import { GetSurveyUseCases } from '@usecases/survey/get-survey.usecases';
import { AnswerSurveyUseCases } from '@usecases/user/answer-survey.usecases';
import { CreateUserUseCases } from '@usecases/user/create-user.usecases';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionModule,
  ],
})
export class UseCasesProxyModule {
  static CREATE_USER_USECASES_PROXY = 'CreateUserUseCasesProxy';
  static CREATE_SURVEY_USECASES_PROXY = 'CreateSurveyUseCasesProxy';
  static GET_SURVEY_USECASES_PROXY = 'GetSurveyUseCasesProxy';
  static CREATE_QUESTION_USECASES_PROXY = 'CreateQuestionUseCasesProxy';
  static GET_QUESTION_USECASES_PROXY = 'getQuestionUseCasesProxy';
  static CREATE_QUESTION_OPTION_USECASES_PROXY =
    'CreateQuestionOptionUseCasesProxy';
  static GET_QUESTION_OPTION_USECASES_PROXY = 'GetQuestionOptionUseCasesProxy';
  static ANSWER_SURVEY_USECASES_PROXY = 'AnswerSurveyUseCasesProxy';
  static ANSWER_QUESTION_USECASES_PROXY = 'AnswerQuestionUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository, ExceptionService],
          provide: UseCasesProxyModule.CREATE_USER_USECASES_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCases(userRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseSurveyRepository],
          provide: UseCasesProxyModule.GET_SURVEY_USECASES_PROXY,
          useFactory: (surveyRepo: DatabaseSurveyRepository) =>
            new UseCaseProxy(new GetSurveyUseCases(surveyRepo)),
        },
        {
          inject: [DatabaseSurveyRepository, ExceptionService],
          provide: UseCasesProxyModule.CREATE_SURVEY_USECASES_PROXY,
          useFactory: (
            surveyRepo: DatabaseSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateSurveyUseCases(surveyRepo, exceptionService),
            ),
        },
        {
          inject: [
            DatabaseSurveyRepository,
            DatabaseQuestionRepository,
            ExceptionService,
          ],
          provide: UseCasesProxyModule.CREATE_QUESTION_USECASES_PROXY,
          useFactory: (
            surveyRepo: DatabaseSurveyRepository,
            questionRepo: DatabaseQuestionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateQuestionUseCases(
                surveyRepo,
                questionRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [DatabaseQuestionRepository],
          provide: UseCasesProxyModule.GET_QUESTION_USECASES_PROXY,
          useFactory: (questionRepo: DatabaseQuestionRepository) =>
            new UseCaseProxy(new GetQuestionUseCases(questionRepo)),
        },
        {
          inject: [
            DatabaseQuestionRepository,
            DatabaseQuestionOptionRepository,
            ExceptionService,
          ],
          provide: UseCasesProxyModule.CREATE_QUESTION_OPTION_USECASES_PROXY,
          useFactory: (
            questionRepo: DatabaseQuestionRepository,
            questionOptionRepo: DatabaseQuestionOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateQuestionOptionUseCases(
                questionRepo,
                questionOptionRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [DatabaseQuestionOptionRepository],
          provide: UseCasesProxyModule.GET_QUESTION_OPTION_USECASES_PROXY,
          useFactory: (questionOptionRepo: DatabaseQuestionOptionRepository) =>
            new UseCaseProxy(new GetQuestionOptionUseCases(questionOptionRepo)),
        },
        {
          inject: [
            DatabaseSurveyRepository,
            DatabaseUserSurveyRepository,
            ExceptionService,
          ],
          provide: UseCasesProxyModule.ANSWER_SURVEY_USECASES_PROXY,
          useFactory: (
            surveyRepo: DatabaseSurveyRepository,
            userSurveyRepo: DatabaseUserSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new AnswerSurveyUseCases(
                surveyRepo,
                userSurveyRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [
            DatabaseUserSurveyRepository,
            DatabaseAnswerRepository,
            DatabaseQuestionRepository,
            DatabaseAnswerOptionRepository,
            ExceptionService,
          ],
          provide: UseCasesProxyModule.ANSWER_QUESTION_USECASES_PROXY,
          useFactory: (
            userSurveyRepo: DatabaseUserSurveyRepository,
            answerRepo: DatabaseAnswerRepository,
            questionRepo: DatabaseQuestionRepository,
            answerOptionRepo: DatabaseAnswerOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new AnswerQuestionUseCases(
                userSurveyRepo,
                answerRepo,
                questionRepo,
                answerOptionRepo,
                exceptionService,
              ),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.CREATE_USER_USECASES_PROXY,
        UseCasesProxyModule.CREATE_SURVEY_USECASES_PROXY,
        UseCasesProxyModule.GET_SURVEY_USECASES_PROXY,
        UseCasesProxyModule.CREATE_QUESTION_USECASES_PROXY,
        UseCasesProxyModule.GET_QUESTION_USECASES_PROXY,
        UseCasesProxyModule.CREATE_QUESTION_OPTION_USECASES_PROXY,
        UseCasesProxyModule.GET_QUESTION_OPTION_USECASES_PROXY,
        UseCasesProxyModule.ANSWER_SURVEY_USECASES_PROXY,
        UseCasesProxyModule.ANSWER_QUESTION_USECASES_PROXY,
      ],
    };
  }
}
