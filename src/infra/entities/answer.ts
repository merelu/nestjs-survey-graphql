import { QuestionOptionModel } from '@domain/model/database/question-option';
import { UserModel } from '@domain/model/database/user';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from './common';
import { QuestionOption } from './question-option.entity';
import { User } from './user.entity';

@Entity()
export class Answer extends CommonEntity {
  @Column({ type: 'integer' })
  userId!: number;

  @ManyToOne(() => User, (user) => user.answers)
  user!: UserModel;

  @Column({ type: 'integer' })
  questionOptionId!: number;

  @ManyToOne(() => QuestionOption, (questionOption) => questionOption.answers)
  questionOption!: QuestionOptionModel;
}
