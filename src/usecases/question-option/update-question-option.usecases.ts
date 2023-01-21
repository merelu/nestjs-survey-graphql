import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { UpdateQuestionOptionModel } from '@domain/model/database/question-option';
import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';
import { EntityManager } from 'typeorm';

export class UpdateQuestionOptionUseCases {
  constructor(
    private readonly questionOptionRepository: IQuestionOptionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    questionOptionId: number,
    data: UpdateQuestionOptionModel,
    conn: EntityManager,
  ) {
    await this.updateQuestionOption(questionOptionId, data, conn);
    const result = await this.getUpdatedQuestionOption(questionOptionId, conn);
    return result;
  }

  private async getUpdatedQuestionOption(
    questionOptionId: number,
    conn?: EntityManager,
  ) {
    const result = await this.questionOptionRepository.findOneById(
      questionOptionId,
      conn,
    );

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return result;
  }

  private async updateQuestionOption(
    questionOptionId: number,
    data: UpdateQuestionOptionModel,
    conn?: EntityManager,
  ) {
    try {
      await this.questionOptionRepository.update(questionOptionId, data, conn);
    } catch (err) {
      console.log(err);
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러',
      });
    }
  }
}
