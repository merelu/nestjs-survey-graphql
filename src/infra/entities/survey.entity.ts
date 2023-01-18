import { QuestionModel } from '@domain/model/database/question';
import { ISurveyModel } from '@domain/model/database/survey';
import { UserSurveyModel } from '@domain/model/database/user-survey';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common';
import { Question } from './question.entity';
import { UserSurvey } from './user-survey.entity';

@Entity()
export class Survey extends CommonEntity implements ISurveyModel {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  footer: string;

  @OneToMany(() => UserSurvey, (userSurvey) => userSurvey.survey)
  userSurveys: UserSurveyModel[];

  @OneToMany(() => Question, (question) => question.survey)
  questions: QuestionModel[];
}
