import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { UpdateQuestionModel } from '@domain/model/database/question';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { EntityManager } from 'typeorm';

export class UpdateQuestionUseCases {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    questionId: number,
    data: UpdateQuestionModel,
    conn: EntityManager,
  ) {
    await this.updateQuestion(questionId, data, conn);
    const result = await this.getUpdatedQuestion(questionId, conn);
    return result;
  }

  private async getUpdatedQuestion(questionId: number, conn?: EntityManager) {
    const result = await this.questionRepository.findDetailById(
      questionId,
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

  private async updateQuestion(
    questionId: number,
    data: UpdateQuestionModel,
    conn?: EntityManager,
  ) {
    try {
      await this.questionRepository.update(questionId, data, conn);
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러',
      });
    }
  }
}
