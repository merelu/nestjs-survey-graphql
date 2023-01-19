import {
  AnswerOptionModel,
  CreateAnswerOptionModel,
} from '@domain/model/database/answer-option';
import { IAnswerOptionRepository } from '@domain/repositories/answer-option.repository.interface';
import { AnswerOption } from '@infra/entities/answer-option';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DatabaseAnswerOptionRepository implements IAnswerOptionRepository {
  constructor(
    @InjectRepository(AnswerOption)
    private readonly answerOptionEntityRepository: Repository<AnswerOption>,
  ) {}

  async create(
    data: CreateAnswerOptionModel,
    conn?: EntityManager,
  ): Promise<AnswerOptionModel> {
    const answerOptionEntity = this.toAnswerOptionEntity(data);
    if (conn) {
      const result = await conn
        .getRepository(AnswerOption)
        .save(answerOptionEntity);

      return this.toAnswerOption(result);
    }
    const result = await this.answerOptionEntityRepository.save(
      answerOptionEntity,
    );
    return this.toAnswerOption(result);
  }

  async insertMany(
    data: CreateAnswerOptionModel[],
    conn?: EntityManager | undefined,
  ): Promise<boolean> {
    const answerOptionEntities = data.map((i) => this.toAnswerOptionEntity(i));

    if (conn) {
      const result = await conn
        .getRepository(AnswerOption)
        .insert(answerOptionEntities);

      if (result.identifiers.length !== data.length) {
        return false;
      }
      return true;
    }

    const result = await this.answerOptionEntityRepository.insert(
      answerOptionEntities,
    );
    if (result.identifiers.length !== data.length) {
      return false;
    }
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.answerOptionEntityRepository.delete({
      id,
    });

    if (!result.affected) {
      return false;
    }

    return true;
  }

  async softDelete(id: number): Promise<boolean> {
    const result = await this.answerOptionEntityRepository.softDelete({
      id,
    });

    if (!result.affected) {
      return false;
    }

    return true;
  }
  private toAnswerOption(data: AnswerOption): AnswerOptionModel {
    const result = new AnswerOptionModel();

    result.id = data.id;
    result.answerId = data.answerId;
    result.answer = data.answer;
    result.questionOptionId = data.questionOptionId;
    result.questionOption = data.questionOption;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }

  private toAnswerOptionEntity(data: CreateAnswerOptionModel): AnswerOption {
    const result = new AnswerOption();

    result.answerId = data.answerId;
    result.questionOptionId = data.questionOptionId;

    return result;
  }
}
