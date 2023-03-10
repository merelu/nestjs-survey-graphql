import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';

export class GetQuestionOptionUseCases {
  constructor(
    private readonly questionOptionRepository: IQuestionOptionRepository,
    private readonly exceptionService: IException,
  ) {}

  async getQuestionOptionDetailById(id: number) {
    const result = await this.questionOptionRepository.findOneById(id);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }
    return result;
  }
}
