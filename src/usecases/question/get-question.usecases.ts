import { IQuestionRepository } from '@domain/repositories/question.repository.interface';

export class GetQuestionUseCases {
  constructor(private readonly questionRepository: IQuestionRepository) {}

  async getQuestionDetailById(id: number) {
    const result = await this.questionRepository.findById(id);

    return result;
  }
}
