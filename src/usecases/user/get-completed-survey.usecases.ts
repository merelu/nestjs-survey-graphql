import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { IUserSurveyRepository } from '@domain/repositories/user-survey.repository.interface';

export class GetCompletedSurveyUseCases {
  constructor(
    private readonly userSurveyRepository: IUserSurveyRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(userSurveyId: number) {
    const sumScore = await this.userSurveyRepository.getSumScoreByUserSurveyId(
      userSurveyId,
    );

    const userSurvey =
      await this.userSurveyRepository.findOneByQueryWithRelation(
        {
          id: userSurveyId,
        },
        [
          'survey',
          'survey.questions',
          'survey.questions.questionOptions',
          'answers',
          'answers.answerOptions',
          'answers.answerOptions.questionOption',
        ],
      );

    if (!userSurvey) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: 'id에 해당하는 데이터가 없습니다.',
      });
    }

    return {
      sumScore,
      userSurvey,
    };
  }
}
