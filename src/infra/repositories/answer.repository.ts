import { CreateAnswerModel, AnswerModel } from '@domain/model/database/answer';
import { IAnswerRepository } from '@domain/repositories/answer.repository.interface';
import { Answer } from '@infra/entities/answer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  EntityManager,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class DatabaseAnswerRepository implements IAnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly answerEntityRepository: Repository<Answer>,
  ) {}

  async create(
    data: CreateAnswerModel,
    conn?: EntityManager,
  ): Promise<AnswerModel> {
    const answerEntity = this.toAnswerEntity(data);

    if (conn) {
      const result = await conn.getRepository(Answer).save(answerEntity);
      return this.toAnswer(result);
    }
    const result = await this.answerEntityRepository.save(answerEntity);
    return this.toAnswer(result);
  }

  async findOneByQueryWithRelation(
    query: FindOptionsWhere<AnswerModel>,
    relations?: string[],
    conn?: EntityManager,
  ): Promise<AnswerModel | null> {
    let result: Answer | null = null;

    if (conn) {
      result = await conn
        .getRepository(Answer)
        .findOne({ where: query, relations });
    } else {
      result = await this.answerEntityRepository.findOne({
        where: query,
        relations,
      });
    }

    if (!result) {
      return null;
    }

    return this.toAnswer(result);
  }

  async delete(id: number, conn?: EntityManager): Promise<boolean> {
    let result: DeleteResult | null = null;

    if (conn) {
      result = await conn.getRepository(Answer).delete({ id });
    } else {
      result = await this.answerEntityRepository.delete({ id });
    }

    if (!result.affected) {
      return false;
    }
    return true;
  }
  async softDelete(id: number, conn?: EntityManager): Promise<boolean> {
    let result: UpdateResult | null = null;

    if (conn) {
      result = await conn.getRepository(Answer).softDelete({ id });
    } else {
      result = await this.answerEntityRepository.softDelete({ id });
    }

    if (!result.affected) {
      return false;
    }
    return true;
  }

  private toAnswer(data: Answer): AnswerModel {
    const result = new AnswerModel();

    result.id = data.id;
    result.questionId = data.questionId;
    result.question = data.question;
    result.userSurveyId = data.userSurveyId;
    result.userSurvey = data.userSurvey;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }

  private toAnswerEntity(data: CreateAnswerModel): Answer {
    const result = new Answer();

    result.userSurveyId = data.userSurveyId;
    result.questionId = data.questionId;

    return result;
  }
}
