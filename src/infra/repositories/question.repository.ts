import {
  CreateQuestionModel,
  QuestionModel,
  UpdateQuestionModel,
} from '@domain/model/database/question';
import { IQuestionRepository } from '@domain/repositories/question.repository.interface';
import { Question } from '@infra/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class DatabaseQuestionRepository implements IQuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly questionEntityRepository: Repository<Question>,
  ) {}

  async create(
    data: CreateQuestionModel,
    conn?: EntityManager,
  ): Promise<QuestionModel> {
    const questionEntity = this.toQuestionEntity(data);
    if (conn) {
      const result = await conn.getRepository(Question).save(questionEntity);
      return this.toQuestion(result);
    }
    const result = await this.questionEntityRepository.save(questionEntity);
    return this.toQuestion(result);
  }

  async findOneById(
    id: number,
    conn?: EntityManager,
  ): Promise<QuestionModel | null> {
    let result: Question | null = null;

    if (conn) {
      result = await conn.getRepository(Question).findOne({ where: { id } });
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

  async findDetailById(
    id: number,
    conn?: EntityManager,
  ): Promise<QuestionModel | null> {
    let result: Question | null = null;
    if (conn) {
      result = await conn
        .getRepository(Question)
        .createQueryBuilder('question')
        .where('question.id = :id', { id })
        .leftJoinAndSelect('question.questionOptions', 'questionOptions')
        .orderBy('questionOptions.order', 'ASC')
        .getOne();
    } else {
      result = await this.questionEntityRepository
        .createQueryBuilder('question')
        .where('question.id = :id', { id })
        .leftJoinAndSelect('question.questionOptions', 'questionOptions')
        .orderBy('questionOptions.order', 'ASC')
        .getOne();
    }

    if (!result) {
      return null;
    }

    return this.toQuestion(result);
  }

  async findOneByQueryWithRelation(
    query: FindOptionsWhere<QuestionModel>,
    relations: string[],
  ): Promise<QuestionModel | null> {
    const result = await this.questionEntityRepository.findOne({
      where: query,
      relations,
    });

    if (!result) {
      return null;
    }

    return this.toQuestion(result);
  }

  async findAll(): Promise<QuestionModel[]> {
    const result = await this.questionEntityRepository.find();
    return result.map((entity) => this.toQuestion(entity));
  }

  async getNextOrder(surveyId: number): Promise<number> {
    const raw = await this.questionEntityRepository
      .createQueryBuilder('question')
      .select('coalesce(max(question.order) + 1,0)', 'maxOrder')
      .where('survey_id = :surveyId', { surveyId })
      .getRawOne();

    return raw.maxOrder;
  }

  async update(
    id: number,
    data: UpdateQuestionModel,
    conn?: EntityManager,
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
    result.order = data.order;
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
    result.order = data.order;

    return result;
  }
}
