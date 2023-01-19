import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateAnswerModel } from '@domain/model/database/answer';
import { CreateAnswerOptionModel } from '@domain/model/database/answer-option';
import { IAnswerOptionRepository } from '@domain/repositories/answer-option.repository.interface';
import { IAnswerRepository } from '@domain/repositories/answer.repository.interface';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { IUserSurveyRepository } from '@domain/repositories/user-survey.repository.interface';
import { EntityManager } from 'typeorm';

export class AnswerQuestionUseCases {
  constructor(
    private readonly userSurveyRepository: IUserSurveyRepository,
    private readonly answerRepository: IAnswerRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly answerOptionRepository: IAnswerOptionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    data: CreateAnswerModel,
    questionOptionIds: number[],
    conn: EntityManager,
  ) {
    const userSurvey = await this.checkUserSurvey(
      data.userSurveyId,
      data.questionId,
    );

    const question = await this.checkQuestion(
      data.questionId,
      userSurvey.surveyId,
      questionOptionIds.length,
    );

    if (
      !this.isValidQuestionOption(
        question.questionOptions.map((i) => i?.id),
        questionOptionIds,
      )
    ) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '올바른 답변이 아닙니다.',
      });
    }

    const answer = await this.answerRepository.create(data, conn);

    const createAnswerOptions = questionOptionIds.map((questionOptionId) => {
      const createAnswerOption = new CreateAnswerOptionModel();
      createAnswerOption.questionOptionId = questionOptionId;
      createAnswerOption.answerId = answer.id;
      return createAnswerOption;
    });

    const isSuccessCreateOptions = await this.answerOptionRepository.insertMany(
      createAnswerOptions,
      conn,
    );

    if (!isSuccessCreateOptions) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '답변을 저장하는데 실패했습니다.',
      });
    }

    const result = await this.answerRepository.findOneByQueryWithRelation(
      { id: answer.id },
      ['answerOptions'],
      conn,
    );

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러',
      });
    }

    return result;
  }

  private async checkUserSurvey(userSurveyId: number, questionId: number) {
    const result = await this.userSurveyRepository.findOneByQueryWithRelation(
      {
        id: userSurveyId,
      },
      ['answers'],
    );

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '응시하지 않은 설문조사입니다.',
      });
    }
    console.log(result);

    const isRespondQuestion =
      result.answers?.filter((answer) => answer?.questionId === questionId)
        .length > 0
        ? true
        : false;

    if (isRespondQuestion) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '이미 답변한 질문입니다.',
      });
    }

    return result;
  }

  private async checkQuestion(
    questionId: number,
    surveyId: number,
    answerOptionLength: number,
  ) {
    const result = await this.questionRepository.findOneByQueryWithRelation(
      { id: questionId, surveyId },
      ['questionOptions'],
    );

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '존재하지 않는 질문입니다.',
      });
    }

    if (!result.allowMultipleAnswers && answerOptionLength > 1) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '중복 응답이 불가능한 질문입니다.',
      });
    }

    if (result.surveyId !== surveyId) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '설문조사에 속한 질문이 아닙니다.',
      });
    }

    return result;
  }

  private isValidQuestionOption(
    questionOptionIds: number[],
    checkedIds: number[],
  ) {
    let result = true;
    checkedIds.forEach((id) => {
      if (!questionOptionIds.includes(id)) {
        result = false;
      }
    });

    return result;
  }
}
