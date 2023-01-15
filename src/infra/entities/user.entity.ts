import { AnswerModel } from '@domain/model/database/answer';
import { UserSurveyModel } from '@domain/model/database/user-survey';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common';
import { Answer } from './answer';
import { UserSurvey } from './user-survey.entity';

@Entity()
export class User extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @OneToMany(() => UserSurvey, (userSurvey) => userSurvey.user)
  userSurveys!: UserSurveyModel[];

  @OneToMany(() => Answer, (answer) => answer.user)
  answers!: AnswerModel[];
}
