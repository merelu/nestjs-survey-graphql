import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';

export class GetQuestionUseCases {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private exceptionService: IException,
  ) {}

  async getQuestionDetailById(id: number) {
    const result = await this.questionRepository.findDetailById(id);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return result;
  }
}
