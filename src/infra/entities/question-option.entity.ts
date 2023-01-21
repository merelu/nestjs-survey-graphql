import { QuestionModel } from '@domain/model/database/question';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common';
import { Question } from './question.entity';
import { IQuestionOptionModel } from '@domain/model/database/question-option';
import { AnswerOption } from './answer-option';
import { AnswerOptionModel } from '@domain/model/database/answer-option';

@Index('QuestionId', ['questionId'], {})
@Entity()
export class QuestionOption
  extends CommonEntity
  implements IQuestionOptionModel
{
  @Column({ type: 'varchar' })
  optionContent: string;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'integer' })
  order: number;

  @Column({ type: 'integer' })
  questionId: number;

  @ManyToOne(() => Question, (question) => question.questionOptions)
  question!: QuestionModel;

  @OneToMany(() => AnswerOption, (answerOption) => answerOption.questionOption)
  answerOptions: AnswerOptionModel[];
}
