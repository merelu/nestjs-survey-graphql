import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { UpdateSurveyModel } from '@domain/model/database/survey';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';
import { EntityManager } from 'typeorm';

export class UpdateSurveyUseCases {
  constructor(
    private readonly surveyRepository: ISurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    surveyId: number,
    data: UpdateSurveyModel,
    conn: EntityManager,
  ) {
    await this.updateSurvey(surveyId, data, conn);
    const result = await this.getUpdatedSurvey(surveyId, conn);
    return result;
  }

  private async getUpdatedSurvey(surveyId: number, conn?: EntityManager) {
    const result = await this.surveyRepository.findDetailById(surveyId, conn);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return result;
  }

  private async updateSurvey(
    surveyId: number,
    data: UpdateSurveyModel,
    conn?: EntityManager,
  ) {
    try {
      await this.surveyRepository.update(surveyId, data, conn);
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러',
      });
    }
  }
}
