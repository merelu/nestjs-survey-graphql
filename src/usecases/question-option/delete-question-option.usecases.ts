import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';

export class DeleteQuestionOptionUseCases {
  constructor(
    private readonly questionOptionRepository: IQuestionOptionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(questionOptionId: number) {
    await this.checkQuestionOption(questionOptionId);
    try {
      await this.questionOptionRepository.softDelete(questionOptionId);
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러 입니다.',
      });
    }
  }

  private async checkQuestionOption(questionOptionId: number) {
    const result = await this.questionOptionRepository.findOneById(
      questionOptionId,
    );
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }
    return result;
  }
}
