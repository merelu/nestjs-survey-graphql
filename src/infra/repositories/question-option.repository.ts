import {
  CreateQuestionOptionModel,
  QuestionOptionModel,
  UpdateQuestionOptionModel,
} from '@domain/model/database/question-option';
import { IQuestionOptionRepository } from '@domain/repositories/question-option.repository.interface';
import { QuestionOption } from '@infra/entities/question-option.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DatabaseQuestionOptionRepository
  implements IQuestionOptionRepository
{
  constructor(
    @InjectRepository(QuestionOption)
    private readonly questionOptionEntityRepository: Repository<QuestionOption>,
  ) {}
  async create(
    data: CreateQuestionOptionModel,
    conn?: EntityManager | undefined,
  ): Promise<QuestionOptionModel | null> {
    const questionOptionEntity = this.toQuestionOptionEntity(data);
    let result: QuestionOption | null = null;
    if (conn) {
      result = await conn
        .getRepository(QuestionOption)
        .save(questionOptionEntity);
    } else {
      result = await this.questionOptionEntityRepository.save(
        questionOptionEntity,
      );
    }
    if (!result) {
      return null;
    }
    return this.toQuestionOption(result);
  }
  async findById(
    id: number,
    conn?: EntityManager | undefined,
  ): Promise<QuestionOptionModel | null> {
    let result: QuestionOption | null = null;

    if (conn) {
      result = await conn
        .getRepository(QuestionOption)
        .findOneOrFail({ where: { id } });
    } else {
      result = await this.questionOptionEntityRepository.findOne({
        where: { id },
      });
    }

    if (!result) {
      return null;
    }
    return this.toQuestionOption(result);
  }

  async findAll(): Promise<QuestionOptionModel[]> {
    const result = await this.questionOptionEntityRepository.find();
    return result.map((entity) => this.toQuestionOption(entity));
  }

  async update(
    id: number,
    data: UpdateQuestionOptionModel,
    conn?: EntityManager | undefined,
  ): Promise<void> {
    if (conn) {
      await conn.getRepository(QuestionOptionModel).update({ id }, data);
    } else {
      await this.questionOptionEntityRepository.update({ id }, data);
    }
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.questionOptionEntityRepository.delete({ id });
    if (!result.affected) {
      return false;
    }

    return true;
  }
  async softDelete(id: number): Promise<boolean> {
    const result = await this.questionOptionEntityRepository.softDelete({ id });
    if (!result.affected) {
      return false;
    }

    return true;
  }

  private toQuestionOption(data: QuestionOption): QuestionOptionModel {
    const result = new QuestionOptionModel();

    result.id = data.id;
    result.optionContent = data.optionContent;
    result.score = data.score;
    result.questionId = data.questionId;
    result.question = data.question;
    result.answers = data.answers;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }
  private toQuestionOptionEntity(
    data: CreateQuestionOptionModel,
  ): QuestionOption {
    const result = new QuestionOption();
    result.optionContent = data.optionContent;
    result.score = data.score;
    result.questionId = data.questionId;
    return result;
  }
}