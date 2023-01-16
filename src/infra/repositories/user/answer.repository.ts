import { CreateAnswerModel, AnswerModel } from '@domain/model/database/answer';
import { IAnswerRepository } from '@domain/repositories/answer.repository.interface';
import { Answer } from '@infra/entities/answer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  EntityManager,
  InsertResult,
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
    conn?: EntityManager | undefined,
  ): Promise<boolean> {
    const answerEntity = this.toAnswerEntity(data);
    let result: InsertResult | null = null;
    if (conn) {
      result = await conn.getRepository(Answer).upsert(answerEntity, {
        skipUpdateIfNoValuesChanged: true,
        conflictPaths: ['user_id', 'question_option_id'],
      });
    } else {
      result = await this.answerEntityRepository.upsert(answerEntity, {
        skipUpdateIfNoValuesChanged: true,
        conflictPaths: ['user_id', 'question_option_id'],
      });
    }
    if (result.raw.length === 0) {
      return false;
    }

    return true;
  }
  async delete(id: number, conn?: EntityManager | undefined): Promise<boolean> {
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
  async softDelete(
    id: number,
    conn?: EntityManager | undefined,
  ): Promise<boolean> {
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
    result.questionOptionId = data.questionOptionId;
    result.questionOption = data.questionOption;
    result.userId = data.userId;
    result.user = data.user;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }

  private toAnswerEntity(data: CreateAnswerModel): Answer {
    const result = new Answer();

    result.questionOptionId = data.questionOptionId;
    result.userId = data.userId;

    return result;
  }
}
