import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';
import { EntityManager } from 'typeorm';

export class UpdateQuestionOptionOrderUseCases {
  constructor(
    private readonly questionOptionRepository: IQuestionOptionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    conn: EntityManager,
    curQuestionOptionId: number,
    nextQuestionOptionId?: number,
  ) {
    const curQuestionOption = await this.checkQuestion(curQuestionOptionId);

    try {
      await this.updateQuestionOptionOrder(
        conn,
        curQuestionOption.questionId,
        curQuestionOptionId,
        nextQuestionOptionId,
      );
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러입니다.',
      });
    }

    const result =
      await this.questionOptionRepository.findByQuestionIdWithRelation(
        curQuestionOption.questionId,
        conn,
      );

    return result;
  }

  private async checkQuestion(questionId: number, conn?: EntityManager) {
    const result = await this.questionOptionRepository.findOneById(
      questionId,
      conn,
    );
    console.log(result);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return result;
  }

  private async updateQuestionOptionOrder(
    conn: EntityManager,
    questionId: number,
    curQuestionOptionId: number,
    nextQuestionOptionId?: number,
  ) {
    if (!nextQuestionOptionId) {
      const updateOrder = await this.questionOptionRepository.getNextOrder(
        questionId,
      );

      await this.questionOptionRepository.udpateOrderById(
        curQuestionOptionId,
        updateOrder,
        conn,
      );
    } else {
      const nextQuestionOption = await this.checkQuestion(nextQuestionOptionId);

      const updateOrder = nextQuestionOption.order;
      await this.questionOptionRepository.incrementOrdersByQuestionId(
        nextQuestionOption.questionId,
        updateOrder,
        conn,
      );

      await this.questionOptionRepository.udpateOrderById(
        curQuestionOptionId,
        updateOrder,
        conn,
      );
    }
  }
}
