import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';

export class DeleteQuestionUseCases {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(questionId: number) {
    await this.checkQuestion(questionId);
    try {
      await this.questionRepository.softDelete(questionId);
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러 입니다.',
      });
    }
  }

  private async checkQuestion(questionId: number) {
    const result = await this.questionRepository.findOneById(questionId);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }
    return result;
  }
}
