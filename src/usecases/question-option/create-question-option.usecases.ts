import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateQuestionOptionModel } from '@domain/model/database/question-option';
import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';

export class CreateQuestionOptionUseCases {
  constructor(
    private readonly questionRepository: IQuestionRepository,
    private readonly questionOptionRepository: IQuestionOptionRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(data: CreateQuestionOptionModel) {
    await this.isValidQuestion(data.questionId);

    const nextOrder = await this.questionOptionRepository.getNextOrder(
      data.questionId,
    );
    data.order = nextOrder;

    const result = await this.questionOptionRepository.create(data);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 에러입니다.',
      });
    }

    return result;
  }

  private async isValidQuestion(questionId: number) {
    const result = await this.questionRepository.findById(questionId);

    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '존재하지 않는 질문 입니다.',
      });
    }
  }
}
