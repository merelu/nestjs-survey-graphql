import {
  CreateUserSurveyModel,
  UserSurveyModel,
} from '@domain/model/database/user-survey';
import { IUserSurveyRepository } from '@domain/repositories/user-survey.repository.interface';
import { UserSurvey } from '@infra/entities/user-survey.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseUserSurveyRepository implements IUserSurveyRepository {
  constructor(
    @InjectRepository(UserSurvey)
    private readonly userSurveyEntityRepository: Repository<UserSurvey>,
  ) {}

  async create(data: CreateUserSurveyModel): Promise<boolean> {
    const userSurveyEntity = this.toUserSurveyEntity(data);

    const result = await this.userSurveyEntityRepository.upsert(
      userSurveyEntity,
      {
        skipUpdateIfNoValuesChanged: true,
        conflictPaths: ['user_id', 'survey_id'],
      },
    );
    if (result.raw.length === 0) {
      return false;
    }
    return true;
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

  private toUserSurveyEntity(data: CreateUserSurveyModel): UserSurvey {
    const result = new UserSurvey();

    result.surveyId = data.surveyId;
    result.userId = data.userId;

    return result;
  }
}
