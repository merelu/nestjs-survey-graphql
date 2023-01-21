import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';

export class DeleteSurveyUseCases {
  constructor(
    private readonly surveyRepository: ISurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(surveyId: number) {
    await this.checkSurvey(surveyId);
    try {
      await this.surveyRepository.softDelete(surveyId);
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러 입니다.',
      });
    }
  }

  private async checkSurvey(surveyId: number) {
    const result = await this.surveyRepository.findOneById(surveyId);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }
    return result;
  }
}
