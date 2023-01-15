import { TypeOrmConfigModule } from '@infra/config/typeorm/typeorm.module';
import { Answer } from '@infra/entities/answer';
import { QuestionOption } from '@infra/entities/question-option.entity';
import { Question } from '@infra/entities/question.entity';
import { Survey } from '@infra/entities/survey.entity';
import { UserSurvey } from '@infra/entities/user-survey.entity';
import { User } from '@infra/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    ]),
  ],
  providers: [],
  exports: [],
})
export class RepositoriesModule {}
