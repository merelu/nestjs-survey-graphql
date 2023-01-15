import { QuestionModel } from '@domain/model/database/question';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common';
import { Question } from './question.entity';
import { Answer } from './answer';
import { AnswerModel } from '@domain/model/database/answer';

@Entity()
export class QuestionOption extends CommonEntity {
  @Column({ type: 'varchar' })
  optionContent: string;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'integer' })
  questionId: number;

  @ManyToOne(() => Question, (question) => question.questionOptions)
  question!: QuestionModel;

  @OneToMany(() => Answer, (answer) => answer.questionOption)
  answers: AnswerModel[];
}
