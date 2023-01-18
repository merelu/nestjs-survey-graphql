import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';

export class GetSurveyUseCases {
  constructor(private readonly surveyRepository: ISurveyRepository) {}

  async getSurveyDetailById(id: number) {
    const result = await this.surveyRepository.findDetailById(id);

    return result;
  }

  async getSurveys() {
    const result = await this.surveyRepository.findAll();
    return result;
  }
}
