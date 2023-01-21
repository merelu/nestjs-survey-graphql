import { IAnswerModel } from '@domain/model/database/answer';
import { AnswerOptionModel } from '@domain/model/database/answer-option';
import { QuestionModel } from '@domain/model/database/question';
import { UserSurveyModel } from '@domain/model/database/user-survey';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AnswerOption } from './answer-option';
import { CommonEntity } from './common';
import { Question } from './question.entity';
import { UserSurvey } from './user-survey.entity';

@Entity()
export class Answer extends CommonEntity implements IAnswerModel {
  @Column({ type: 'integer' })
  userSurveyId!: number;

  @ManyToOne(() => UserSurvey, (userSurvey) => userSurvey.answers)
  userSurvey!: UserSurveyModel;

  @Column({ type: 'integer' })
  questionId!: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question!: QuestionModel;

  @OneToMany(() => AnswerOption, (answerOption) => answerOption.answer)
  answerOptions: AnswerOptionModel[];
}
