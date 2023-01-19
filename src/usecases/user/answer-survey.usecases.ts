import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateUserSurveyModel } from '@domain/model/database/user-survey';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';
import { IUserSurveyRepository } from '@domain/repositories/user-survey.repository.interface';

export class AnswerSurveyUseCases {
  constructor(
    private readonly surveyRepository: ISurveyRepository,
    private readonly userSurveyRepository: IUserSurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(data: CreateUserSurveyModel) {
    await this.isValidSurvey(data.surveyId);

    try {
      const result = await this.userSurveyRepository.create(data);
      return result;
    } catch {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '이미 응시한 설문입니다.',
      });
    }
  }

  private async isValidSurvey(surveyId: number) {
    const result = await this.surveyRepository.findById(surveyId);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '존재하지 않는 설문입니다.',
      });
    }
  }
}
