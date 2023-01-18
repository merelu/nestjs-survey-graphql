import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';

export class GetQuestionOptionUseCases {
  constructor(
    private readonly questionOptionRepository: IQuestionOptionRepository,
  ) {}

  async getQuestionOptionDetailById(id: number) {
    const result = await this.questionOptionRepository.findById(id);

    return result;
  }
}
