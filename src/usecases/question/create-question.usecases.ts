import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateQuestionModel } from '@domain/model/database/question';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';

export class CreateQuestionUseCases {
  constructor(
    private readonly surveyRepository: ISurveyRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(data: CreateQuestionModel) {
    await this.isValidSurvey(data.surveyId);

    const nextOrder = await this.questionRepository.getNextOrder(data.surveyId);

    data.order = nextOrder;

    const result = await this.questionRepository.create(data);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 에러입니다.',
      });
    }
    return result;
  }

  private async isValidSurvey(surveyId: number) {
    const result = await this.surveyRepository.findById(surveyId);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '존재하지 않는 설문조사 입니다.',
      });
    }
  }

  private async getNextOrder(surveyId: number) {
    return await this.questionRepository.getNextOrder(surveyId);
  }
}
