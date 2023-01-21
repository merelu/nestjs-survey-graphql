import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IAnswerRepository } from '@domain/repositories/answer.repository.interface';

export class DeleteAnswerUseCases {
  constructor(
    private readonly answerRepository: IAnswerRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(answerId: number) {
    await this.checkAnswer(answerId);
    try {
      await this.answerRepository.softDelete(answerId);
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러 입니다.',
      });
    }
  }

  private async checkAnswer(answerId: number) {
    const result = await this.answerRepository.findOneById(answerId);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }
    return result;
  }
}
