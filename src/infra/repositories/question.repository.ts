import {
  CreateQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from '@domain/model/database/question';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { Question } from '@infra/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DatabaseQuestionRepository implements IQuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly questionEntityRepository: Repository<Question>,
  ) {}
  async create(
    data: CreateQuestionModel,
    conn?: EntityManager | undefined,
  ): Promise<QuestionModel | null> {
    const questionEntity = this.toQuestionEntity(data);
    let result: Question | null = null;
    if (conn) {
      result = await conn.getRepository(Question).save(questionEntity);
    } else {
      result = await this.questionEntityRepository.save(questionEntity);
    }
    if (!result) {
      return null;
    }
    return this.toQuestion(result);
  }

  async findById(
    id: number,
    conn?: EntityManager | undefined,
  ): Promise<QuestionModel | null> {
    let result: Question | null = null;

    if (conn) {
      result = await conn
        .getRepository(Question)
        .findOneOrFail({ where: { id } });
    } else {
      result = await this.questionEntityRepository.findOne({
        where: { id },
      });
    }

    if (!result) {
      return null;
    }
    return this.toQuestion(result);
  }

  async findAll(): Promise<QuestionModel[]> {
    const result = await this.questionEntityRepository.find();
    return result.map((entity) => this.toQuestion(entity));
  }

  async update(
    id: number,
    data: UpdateQuestionModel,
    conn?: EntityManager | undefined,
  ): Promise<void> {
    if (conn) {
      await conn.getRepository(Question).update({ id }, data);
    } else {
      await this.questionEntityRepository.update({ id }, data);
    }
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.questionEntityRepository.delete({ id });
    if (!result.affected) {
      return false;
    }

    return true;
  }
  async softDelete(id: number): Promise<boolean> {
    const result = await this.questionEntityRepository.softDelete({ id });
    if (!result.affected) {
      return false;
    }

    return true;
  }

  private toQuestion(data: Question): QuestionModel {
    const result = new QuestionModel();

    result.id = data.id;
    result.questionContent = data.questionContent;
    result.allowMultipleAnswers = data.allowMultipleAnswers;
    result.questionOptions = data.questionOptions;
    result.surveyId = data.surveyId;
    result.survey = data.survey;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }

  private toQuestionEntity(data: CreateQuestionModel): Question {
    const result = new Question();

    result.questionContent = data.questionContent;
    result.surveyId = data.surveyId;
    result.allowMultipleAnswers = data.allowMultipleAnswers;

    return result;
  }
}