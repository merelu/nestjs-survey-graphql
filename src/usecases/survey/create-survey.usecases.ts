import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateSurveyModel } from '@domain/model/database/survey';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';

export class CreateSurveyUseCases {
  constructor(
    private readonly surveyRepository: ISurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(data: CreateSurveyModel) {
    const result = await this.surveyRepository.create(data);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 에러입니다.',
      });
    }
    return result;
  }
}
