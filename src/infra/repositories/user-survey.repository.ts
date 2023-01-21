import {
  CreateUserSurveyModel,
  UserSurveyModel,
} from '@domain/model/database/user-survey';
import { IUserSurveyRepository } from '@domain/repositories/user-survey.repository.interface';
import { UserSurvey } from '@infra/entities/user-survey.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class DatabaseUserSurveyRepository implements IUserSurveyRepository {
  constructor(
    @InjectRepository(UserSurvey)
    private readonly userSurveyEntityRepository: Repository<UserSurvey>,
  ) {}

  async create(data: CreateUserSurveyModel): Promise<UserSurveyModel> {
    const userSurveyEntity = this.toUserSurveyEntity(data);

    const result = await this.userSurveyEntityRepository.save(userSurveyEntity);

    return this.toUserSurvey(result);
  }

  async findOneByQueryWithRelation(
    query: FindOptionsWhere<UserSurveyModel>,
    relations?: string[],
  ): Promise<UserSurveyModel | null> {
    const result = await this.userSurveyEntityRepository.findOne({
      where: query,
      relations,
    });
    if (!result) {
      return null;
    }
    return this.toUserSurvey(result);
  }

  async getSumScoreByUserSurveyId(userSurveyId: number): Promise<number> {
    const result = await this.userSurveyEntityRepository
      .createQueryBuilder('userSurvey')
      .where('userSurvey.id = :userSurveyId', { userSurveyId })
      .select('sum(questionOption.score)', 'sum')
      .leftJoin('userSurvey.answers', 'answers')
      .leftJoin('answers.answerOptions', 'answerOptions')
      .leftJoin('answerOptions.questionOption', 'questionOption')
      .groupBy('userSurvey.id')
      .getRawOne();

    return result.sum;
  }

  async updateIsDone(id: number, isDone: boolean): Promise<void> {
    await this.userSurveyEntityRepository.update(id, {
      isDone,
    });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userSurveyEntityRepository.delete({
      id,
    });
    if (!result.affected) {
      return false;
    }
    return true;
  }
  async softDelete(id: number): Promise<boolean> {
    const result = await this.userSurveyEntityRepository.softDelete({
      id,
    });
    if (!result.affected) {
      return false;
    }
    return true;
  }

  private toUserSurvey(data: UserSurvey): UserSurveyModel {
    const result = new UserSurveyModel();
    result.id = data.id;
    result.isDone = data.isDone;
    result.userId = data.userId;
    result.user = data.user;
    result.surveyId = data.surveyId;
    result.survey = data.survey;
    result.answers = data.answers;
    result.createdAt = data.createdAt;
    result.updatedAt = data.updatedAt;
    result.deletedAt = data.deletedAt;

    return result;
  }

  private toUserSurveyEntity(data: CreateUserSurveyModel): UserSurvey {
    const result = new UserSurvey();

    result.surveyId = data.surveyId;
    result.userId = data.userId;

    return result;
  }
}
