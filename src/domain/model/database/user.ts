import { PickType } from '@nestjs/mapped-types';
import { AnswerModel } from './answer';
import { CommonModel } from './common';
import { UserSurveyModel } from './user-survey';
export interface IUserModel {
  name: string;
}
export class UserModel extends CommonModel implements IUserModel {
  name: string;

  userSurveys: UserSurveyModel[];

  answers: AnswerModel[];
}

export class CreateUserModel extends PickType(UserModel, ['name'] as const) {}

export class UpdateUserModel extends CreateUserModel {}
