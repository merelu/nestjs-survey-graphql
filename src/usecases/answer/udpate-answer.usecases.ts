import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateAnswerOptionModel } from '@domain/model/database/answer-option';
import { IAnswerOptionRepository } from '@domain/repositories/answer-option.repository.interface';
import { IAnswerRepository } from '@domain/repositories/answer.repository.interface';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { EntityManager } from 'typeorm';

export class UpdateAnswerUseCases {
  constructor(
    private readonly answerRepository: IAnswerRepository,
    private readonly answerOptionRepository: IAnswerOptionRepository,
    private readonly questionRepository: IQuestionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(
    answerId: number,
    questionOptionIds: number[],
    conn: EntityManager,
  ) {
    const answer = await this.answerRepository.findOneByQueryWithRelation(
      { id: answerId },
      ['answerOptions'],
    );

    if (!answer) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    await this.checkQuestion(answer.questionId, questionOptionIds.length);

    const prevAnswerQuestionOptions = answer.answerOptions.map(
      (i) => i.questionOptionId,
    );

    const deletedOptionIds = prevAnswerQuestionOptions.filter(
      (id) => !questionOptionIds.includes(id),
    );
    const insertedOptionIds = questionOptionIds.filter(
      (id) => !prevAnswerQuestionOptions.includes(id),
    );

    if (deletedOptionIds.length > 0) {
      const isSuccessDeleteOptions =
        await this.answerOptionRepository.softDeleteMany(
          answerId,
          deletedOptionIds,
          conn,
        );
      if (!isSuccessDeleteOptions) {
        throw this.exceptionService.apolloServerException({
          error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
          error_text: '답변을 저장하는데 실패했습니다.',
        });
      }
    }

    if (insertedOptionIds.length > 0) {
      const createAnswerOptions = insertedOptionIds.map((optionId) => {
        const createAnswerOption = new CreateAnswerOptionModel();
        createAnswerOption.answerId = answerId;
        createAnswerOption.questionOptionId = optionId;
        return createAnswerOption;
      });

      const isSuccessCreateOptions =
        await this.answerOptionRepository.insertMany(createAnswerOptions, conn);

      if (!isSuccessCreateOptions) {
        throw this.exceptionService.apolloServerException({
          error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
          error_text: '답변을 저장하는데 실패했습니다.',
        });
      }
    }

    const result = this.answerRepository.findOneByQueryWithRelation(
      {
        id: answerId,
      },
      ['answerOptions'],
      conn,
    );

    return result;
  }

  private async checkQuestion(questionId: number, answerOptionLength: number) {
    const result = await this.questionRepository.findOneByQueryWithRelation(
      { id: questionId },
      ['questionOptions'],
    );

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '존재하지 않는 질문입니다.',
      });
    }

    if (!result.allowMultipleAnswers && answerOptionLength > 1) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '중복 응답이 불가능한 질문입니다.',
      });
    }

    return result;
  }
}
