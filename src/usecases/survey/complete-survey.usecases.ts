import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IUserSurveyRepository } from '@domain/repositories/user-survey.repository.interface';

export class CompleteSurveyUseCases {
  constructor(
    private readonly userSurveyRepository: IUserSurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(userSurveyId: number) {
    const result = await this.userSurveyRepository.findOneByQueryWithRelation(
      { id: userSurveyId },
      ['survey', 'survey.questions', 'answers'],
    );

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    if (!result.survey) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.FORBIDDEN_REQUEST,
        error_text: '삭제된 설문조사 입니다.',
      });
    }

    if (result.isDone) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '이미 완료한 설문조사입니다.',
      });
    }

    const allQuestions = result.survey.questions.map((i) => i.id);
    const allRespondQuestions = result.answers.map((i) => i.questionId);
    const inCompletedQuestionIds: number[] = [];
    const isDone = allQuestions.every((id) => {
      if (allRespondQuestions.includes(id)) {
        return true;
      } else {
        inCompletedQuestionIds.push(id);
        return false;
      }
    });

    if (isDone) {
      await this.userSurveyRepository.updateIsDone(userSurveyId, isDone);
    }

    return inCompletedQuestionIds;
  }
}
