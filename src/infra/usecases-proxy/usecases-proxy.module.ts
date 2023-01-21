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
import { DeleteQuestionOptionUseCases } from '@usecases/question-option/delete-question-option.usecases';
import { GetQuestionOptionUseCases } from '@usecases/question-option/get-question-option.usecases';
import { UpdateQuestionOptionUseCases } from '@usecases/question-option/update-question-option.usecases';
import { CreateAnswerUseCases } from '@usecases/answer/create-answer.usecases';
import { CreateQuestionUseCases } from '@usecases/question/create-question.usecases';
import { DeleteQuestionUseCases } from '@usecases/question/delete-question.usecases';
import { GetQuestionUseCases } from '@usecases/question/get-question.usecases';
import { UpdateQuestionUseCases } from '@usecases/question/update-question.usecases';
import { CreateSurveyUseCases } from '@usecases/survey/create-survey.usecases';
import { DeleteSurveyUseCases } from '@usecases/survey/delete-survey.usecases';
import { GetSurveyUseCases } from '@usecases/survey/get-survey.usecases';
import { UpdateSurveyUseCases } from '@usecases/survey/update-survey.usecases';
import { AnswerSurveyUseCases } from '@usecases/user/answer-survey.usecases';
import { CreateUserUseCases } from '@usecases/user/create-user.usecases';
import { UseCaseProxy } from './usecases-proxy';
import { GetAnswerUseCases } from '@usecases/answer/get-answer.usecases';
import { UpdateAnswerUseCases } from '@usecases/answer/udpate-answer.usecases';
import { DeleteAnswerUseCases } from '@usecases/answer/delete-answer.usecases';
import { CompleteSurveyUseCases } from '@usecases/user/complete-survey.usecases';
import { GetCompletedSurveyUseCases } from '@usecases/user/get-completed-survey.usecases';
import { UpdateQuestionOrderUseCases } from '@usecases/question/update-question-order.usecases';
import { UpdateQuestionOptionOrderUseCases } from '@usecases/question-option/update-question-option-order.usecases';

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
  static CREATE_ANSWER_USECASES_PROXY = 'CreateAnswerUseCasesProxy';

  static UPDATE_SURVEY_USECASES_PROXY = 'UpdateSurveyUseCasesProxy';
  static DELETE_SURVEY_USECASES_PROXY = 'DeleteSurveyUseCasesProxy';

  static UPDATE_QUESTION_USECASES_PROXY = 'UpdateQuestionUseCasesProxy';
  static UPDATE_QUESTION_ORDER_USECASES_PROXY =
    'UpdateQuestionOrderUseCasesProxy';
  static DELETE_QUESTION_USECASES_PROXY = 'DeleteQuestionUseCasesProxy';

  static UPDATE_QUESTION_OPTION_USECASES_PROXY =
    'UpdateQuestionOptionUseCasesProxy';
  static UPDATE_QUESTION_OPTION_ORDER_USECASES_PROXY =
    'UpdateQuestionOptionOrderUseCasesProxy';
  static DELETE_QUESTION_OPTION_USECASES_PROXY =
    'DeleteQuestionOptionUseCasesProxy';

  static GET_ANSWER_USECASES_PROXY = 'GetAnswerUseCasesProxy';
  static UPDATE_ANSWER_USECASES_PROXY = 'UpdateAnswerUseCasesProxy';
  static DELETE_ANSWER_USECASES_PROXY = 'DeleteAnswerUseCasesProxy';

  static COMPLETE_SURVEY_USECASES_PROXY = 'CompleteSurveyUseCasesProxy';
  static GET_COMPLETED_SURVEY_USECASES_PROXY =
    'GetCompletedSurveyUseCasesProxy';

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
          inject: [DatabaseSurveyRepository, ExceptionService],
          provide: UseCasesProxyModule.GET_SURVEY_USECASES_PROXY,
          useFactory: (
            surveyRepo: DatabaseSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetSurveyUseCases(surveyRepo, exceptionService),
            ),
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
          inject: [DatabaseQuestionRepository, ExceptionService],
          provide: UseCasesProxyModule.GET_QUESTION_USECASES_PROXY,
          useFactory: (
            questionRepo: DatabaseQuestionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetQuestionUseCases(questionRepo, exceptionService),
            ),
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
          inject: [DatabaseQuestionOptionRepository, ExceptionService],
          provide: UseCasesProxyModule.GET_QUESTION_OPTION_USECASES_PROXY,
          useFactory: (
            questionOptionRepo: DatabaseQuestionOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetQuestionOptionUseCases(
                questionOptionRepo,
                exceptionService,
              ),
            ),
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
          provide: UseCasesProxyModule.CREATE_ANSWER_USECASES_PROXY,
          useFactory: (
            userSurveyRepo: DatabaseUserSurveyRepository,
            answerRepo: DatabaseAnswerRepository,
            questionRepo: DatabaseQuestionRepository,
            answerOptionRepo: DatabaseAnswerOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CreateAnswerUseCases(
                userSurveyRepo,
                answerRepo,
                questionRepo,
                answerOptionRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [DatabaseSurveyRepository, ExceptionService],
          provide: UseCasesProxyModule.UPDATE_SURVEY_USECASES_PROXY,
          useFactory: (
            surveyRepo: DatabaseSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateSurveyUseCases(surveyRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseSurveyRepository, ExceptionService],
          provide: UseCasesProxyModule.DELETE_SURVEY_USECASES_PROXY,
          useFactory: (
            surveyRepo: DatabaseSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new DeleteSurveyUseCases(surveyRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseQuestionRepository, ExceptionService],
          provide: UseCasesProxyModule.UPDATE_QUESTION_USECASES_PROXY,
          useFactory: (
            questionRepo: DatabaseQuestionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateQuestionUseCases(questionRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseQuestionRepository, ExceptionService],
          provide: UseCasesProxyModule.DELETE_QUESTION_USECASES_PROXY,
          useFactory: (
            questionRepo: DatabaseQuestionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new DeleteQuestionUseCases(questionRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseQuestionOptionRepository, ExceptionService],
          provide: UseCasesProxyModule.UPDATE_QUESTION_OPTION_USECASES_PROXY,
          useFactory: (
            questionOptionRepo: DatabaseQuestionOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateQuestionOptionUseCases(
                questionOptionRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [DatabaseQuestionOptionRepository, ExceptionService],
          provide: UseCasesProxyModule.DELETE_QUESTION_OPTION_USECASES_PROXY,
          useFactory: (
            questionOptionRepo: DatabaseQuestionOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new DeleteQuestionOptionUseCases(
                questionOptionRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [DatabaseAnswerRepository, ExceptionService],
          provide: UseCasesProxyModule.GET_ANSWER_USECASES_PROXY,
          useFactory: (
            answerRepo: DatabaseAnswerRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetAnswerUseCases(answerRepo, exceptionService),
            ),
        },
        {
          inject: [
            DatabaseAnswerRepository,
            DatabaseAnswerOptionRepository,
            DatabaseQuestionRepository,
            ExceptionService,
          ],
          provide: UseCasesProxyModule.UPDATE_ANSWER_USECASES_PROXY,
          useFactory: (
            answerRepo: DatabaseAnswerRepository,
            answerOptionRepo: DatabaseAnswerOptionRepository,
            questionRepo: DatabaseQuestionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateAnswerUseCases(
                answerRepo,
                answerOptionRepo,
                questionRepo,
                exceptionService,
              ),
            ),
        },
        {
          inject: [DatabaseAnswerRepository, ExceptionService],
          provide: UseCasesProxyModule.DELETE_ANSWER_USECASES_PROXY,
          useFactory: (
            answerRepo: DatabaseAnswerRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new DeleteAnswerUseCases(answerRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseUserSurveyRepository, ExceptionService],
          provide: UseCasesProxyModule.COMPLETE_SURVEY_USECASES_PROXY,
          useFactory: (
            userSurveyRepo: DatabaseUserSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new CompleteSurveyUseCases(userSurveyRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseUserSurveyRepository, ExceptionService],
          provide: UseCasesProxyModule.GET_COMPLETED_SURVEY_USECASES_PROXY,
          useFactory: (
            userSurveyRepo: DatabaseUserSurveyRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new GetCompletedSurveyUseCases(userSurveyRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseQuestionRepository, ExceptionService],
          provide: UseCasesProxyModule.UPDATE_QUESTION_ORDER_USECASES_PROXY,
          useFactory: (
            questionRepo: DatabaseQuestionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateQuestionOrderUseCases(questionRepo, exceptionService),
            ),
        },
        {
          inject: [DatabaseQuestionOptionRepository, ExceptionService],
          provide:
            UseCasesProxyModule.UPDATE_QUESTION_OPTION_ORDER_USECASES_PROXY,
          useFactory: (
            questionOptionRepo: DatabaseQuestionOptionRepository,
            exceptionService: ExceptionService,
          ) =>
            new UseCaseProxy(
              new UpdateQuestionOptionOrderUseCases(
                questionOptionRepo,
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
        UseCasesProxyModule.CREATE_ANSWER_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_SURVEY_USECASES_PROXY,
        UseCasesProxyModule.DELETE_SURVEY_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_QUESTION_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_QUESTION_ORDER_USECASES_PROXY,
        UseCasesProxyModule.DELETE_QUESTION_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_QUESTION_OPTION_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_QUESTION_OPTION_ORDER_USECASES_PROXY,
        UseCasesProxyModule.DELETE_QUESTION_OPTION_USECASES_PROXY,
        UseCasesProxyModule.GET_ANSWER_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_ANSWER_USECASES_PROXY,
        UseCasesProxyModule.DELETE_ANSWER_USECASES_PROXY,
        UseCasesProxyModule.COMPLETE_SURVEY_USECASES_PROXY,
        UseCasesProxyModule.GET_COMPLETED_SURVEY_USECASES_PROXY,
      ],
    };
  }
}
