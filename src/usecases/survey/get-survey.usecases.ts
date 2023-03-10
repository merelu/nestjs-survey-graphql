import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';

export class GetSurveyUseCases {
  constructor(
    private readonly surveyRepository: ISurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async getSurveyDetailById(id: number) {
    const result = await this.surveyRepository.findDetailById(id);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return result;
  }

  async getSurveys() {
    const result = await this.surveyRepository.findAll();
    return result;
  }
}
