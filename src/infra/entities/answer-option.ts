import { AnswerModel } from '@domain/model/database/answer';
import { IAnswerOptionModel } from '@domain/model/database/answer-option';
import { QuestionOptionModel } from '@domain/model/database/question-option';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Answer } from './answer';
import { CommonEntity } from './common';
import { QuestionOption } from './question-option.entity';

@Entity()
export class AnswerOption extends CommonEntity implements IAnswerOptionModel {
  @Column({ type: 'integer' })
  answerId: number;

  @ManyToOne(() => Answer, (answer) => answer.answerOptions)
  answer: AnswerModel;

  @Column({ type: 'integer' })
  questionOptionId: number;

  @ManyToOne(() => QuestionOption, (questionOption) => questionOption)
  questionOption: QuestionOptionModel;
}
