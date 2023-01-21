import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { EntityManager } from 'typeorm';

export class UpdateQuestionOrderUseCases {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    conn: EntityManager,
    curQuestionId: number,
    nextQuestionId?: number,
  ) {
    const curQuestion = await this.checkQuestion(curQuestionId);

    try {
      await this.updateQuestionOrder(
        conn,
        curQuestion.surveyId,
        curQuestionId,
        nextQuestionId,
      );
    } catch (err) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 서버에러입니다.',
      });
    }

    const result = await this.questionRepository.findBySurveyIdWithRelation(
      curQuestion.surveyId,
      conn,
    );

    return result;
  }

  private async checkQuestion(questionId: number, conn?: EntityManager) {
    const result = await this.questionRepository.findOneById(questionId, conn);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return result;
  }

  private async updateQuestionOrder(
    conn: EntityManager,
    surveyId: number,
    curQuestionId: number,
    nextQuestionId?: number,
  ) {
    if (!nextQuestionId) {
      const updateOrder = await this.questionRepository.getNextOrder(surveyId);

      await this.questionRepository.udpateOrderById(
        curQuestionId,
        updateOrder,
        conn,
      );
    } else {
      const nextQuestion = await this.checkQuestion(nextQuestionId);

      const updateOrder = nextQuestion.order;
      await this.questionRepository.incrementOrdersBySurveyId(
        nextQuestion.surveyId,
        updateOrder,
        conn,
      );

      await this.questionRepository.udpateOrderById(
        curQuestionId,
        updateOrder,
        conn,
      );
    }
  }
}
