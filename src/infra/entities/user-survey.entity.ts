import { SurveyModel } from '@domain/model/database/survey';
import { UserModel } from '@domain/model/database/user';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common';
import { Survey } from './survey.entity';
import { User } from './user.entity';

@Entity()
export class UserSurvey extends CommonEntity {
  @Column({ type: 'integer' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.userSurveys)
  user!: UserModel;

  @Column({ type: 'integer' })
  surveyId!: number;

  @ManyToOne(() => Survey, (survey) => survey.userSurveys)
  survey!: SurveyModel;
}
