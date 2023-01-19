import { UserSurveyModel } from '@domain/model/database/user-survey';
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from './common';
import { UserSurvey } from './user-survey.entity';
import { IUserModel } from '@domain/model/database/user';

@Entity()
export class User extends CommonEntity implements IUserModel {
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @OneToMany(() => UserSurvey, (userSurvey) => userSurvey.user)
  userSurveys!: UserSurveyModel[];
}
