import { IUserSurveyModel } from '@domain/model/database/user-survey';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSurveyType implements IUserSurveyModel {
  @Field(() => ID)
  id: number;

  @Field()
  userId: number;

  @Field()
  surveyId: number;
}
