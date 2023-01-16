import { QuestionOptionModel } from '@domain/model/database/question-option';
import { SurveyModel } from '@domain/model/database/survey';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './common';
import { QuestionOption } from './question-option.entity';
import { Survey } from './survey.entity';

@Entity()
export class Question extends CommonEntity {
  @Column({ type: 'varchar', nullable: false })
  questionContent: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  allowMultipleAnswers: boolean;

  @Column({ type: 'integer' })
  surveyId!: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
  survey!: SurveyModel;

  @OneToMany(() => QuestionOption, (questionOption) => questionOption.question)
  questionOptions: QuestionOptionModel[];
}