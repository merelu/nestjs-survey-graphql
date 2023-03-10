import {
  CreateSurveyModel,
  SurveyModel,
  UpdateSurveyModel,
} from '@domain/model/database/survey';
import { ISurveyRepository } from '@domain/repositories/survey.repository.interface';
import { Survey } from '@infra/entities/survey.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DatabaseSurveyRepository implements ISurveyRepository {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyEntityRepository: Repository<Survey>,
  ) {}
  async create(
    data: CreateSurveyModel,
    conn?: EntityManager,
  ): Promise<SurveyModel> {
    const surveyEntity = this.toSurveyEntity(data);
    if (conn) {
      const result = await conn.getRepository(Survey).save(surveyEntity);
      return this.toSurvey(result);
    }
    const result = await this.surveyEntityRepository.save(surveyEntity);

    return this.toSurvey(result);
  }

  async findOneById(
    id: number,
    conn?: EntityManager,
  ): Promise<SurveyModel | null> {
    let result: Survey | null = null;

    if (conn) {
      result = await conn.getRepository(Survey).findOne({ where: { id } });
    } else {
      result = await this.surveyEntityRepository.findOne({
        where: { id },
      });
    }

    if (!result) {
      return null;
    }

    return this.toSurvey(result);
  }

  async findDetailById(
    id: number,
    conn?: EntityManager,
  ): Promise<SurveyModel | null> {
    let result: Survey | null = null;
    if (conn) {
      result = await conn
        .getRepository(Survey)
        .createQueryBuilder('survey')
        .where('survey.id = :id', { id })
        .leftJoinAndSelect('survey.questions', 'questions')
        .leftJoinAndSelect('questions.questionOptions', 'questionOptions')
        .orderBy('questions.order', 'ASC')
        .addOrderBy('questionOptions.order', 'ASC')
        .getOne();
    } else {
      result = await this.surveyEntityRepository
        .createQueryBuilder('survey')
        .where('survey.id = :id', { id })
        .leftJoinAndSelect('survey.questions', 'questions')
        .leftJoinAndSelect('questions.questionOptions', 'questionOptions')
        .orderBy('questions.order', 'ASC')
        .addOrderBy('questionOptions.order', 'ASC')
        .getOne();
    }

    if (!result) {
      return null;
    }

    return this.toSurvey(result);
  }

  async findAll(): Promise<SurveyModel[]> {
    const result = await this.surveyEntityRepository.find();
    return result.map((entity) => this.toSurvey(entity));
  }

  async update(
    id: number,
    data: UpdateSurveyModel,
    conn?: EntityManager,
  ): Promise<void> {
    if (conn) {
      await conn.getRepository(Survey).update({ id }, data);
    } else {
      await this.surveyEntityRepository.update({ id }, data);
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.surveyEntityRepository.delete({ id });
    if (!result.affected) {
      return false;
    }

    return true;
  }
  async softDelete(id: number): Promise<boolean> {
    const result = await this.surveyEntityRepository.softDelete({ id });
    if (!result.affected) {
      return false;
    }

    return true;
  }

  private toSurvey(data: Survey): SurveyModel {
    const result = new SurveyModel();

    result.id = data.id;
    result.title = data.title;
    result.description = data.description;
    result.footer = data.footer;
    result.questions = data.questions;
    result.userSurveys = data.userSurveys;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }

  private toSurveyEntity(data: CreateSurveyModel): Survey {
    const result = new Survey();

    result.title = data.title;
    result.description = data.description;
    result.footer = data.footer;

    return result;
  }
}
