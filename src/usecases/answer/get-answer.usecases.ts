import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IAnswerRepository } from '@domain/repositories/answer.repository.interface';

export class GetAnswerUseCases {
  constructor(
    private readonly answerRepository: IAnswerRepository,
    private exceptionService: IException,
  ) {}

  async getAnswerDetailById(id: number) {
    const result = await this.answerRepository.findOneByQueryWithRelation(
      { id },
      ['answerOptions'],
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
