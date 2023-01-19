import { TypeOrmConfigModule } from '@infra/config/typeorm/typeorm.module';
import { Answer } from '@infra/entities/answer';
import { AnswerOption } from '@infra/entities/answer-option';
import { QuestionOption } from '@infra/entities/question-option.entity';
import { Question } from '@infra/entities/question.entity';
import { Survey } from '@infra/entities/survey.entity';
import { UserSurvey } from '@infra/entities/user-survey.entity';
import { User } from '@infra/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseAnswerOptionRepository } from './answer-option.repository';
import { DatabaseAnswerRepository } from './answer.repository';
import { DatabaseQuestionOptionRepository } from './question-option.repository';
import { DatabaseQuestionRepository } from './question.repository';
import { DatabaseSurveyRepository } from './survey.repository';
import { DatabaseUserSurveyRepository } from './user-survey.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      User,
      UserSurvey,
      Survey,
      Question,
      QuestionOption,
      Answer,
      AnswerOption,
    ]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseSurveyRepository,
    DatabaseUserSurveyRepository,
    DatabaseQuestionRepository,
    DatabaseQuestionOptionRepository,
    DatabaseAnswerRepository,
    DatabaseAnswerOptionRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseSurveyRepository,
    DatabaseUserSurveyRepository,
    DatabaseQuestionRepository,
    DatabaseQuestionOptionRepository,
    DatabaseAnswerRepository,
    DatabaseAnswerOptionRepository,
  ],
})
export class RepositoriesModule {}
