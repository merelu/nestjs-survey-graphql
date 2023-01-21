import { AnswerModel } from '@domain/model/database/answer';
import { SurveyModel } from '@domain/model/database/survey';
import { UserModel } from '@domain/model/database/user';
import { IUserSurveyModel } from '@domain/model/database/user-survey';
import { Column, Entity, Index, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Answer } from './answer';
import { CommonEntity } from './common';
import { Survey } from './survey.entity';
import { User } from './user.entity';

@Index('UserId', ['userId'], {})
@Entity()
@Unique(['userId', 'surveyId'])
export class UserSurvey extends CommonEntity implements IUserSurveyModel {
  @Column({ type: 'boolean', nullable: false, default: false })
  isDone: boolean;

  @Column({ type: 'integer' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.userSurveys)
  user!: UserModel;

  @Column({ type: 'integer' })
  surveyId!: number;

  @ManyToOne(() => Survey, (survey) => survey.userSurveys)
  survey!: SurveyModel;

  @OneToMany(() => Answer, (answer) => answer.userSurvey)
  answers: AnswerModel[];
}
