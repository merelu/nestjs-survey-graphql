import { IUserSurveyModel } from '@domain/model/database/user-survey';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSurveyType implements IUserSurveyModel {
  @Field(() => Int)
  id: number;

  @Field()
  isDone: boolean;

  @Field()
  userId: number;

  @Field()
  surveyId: number;
}
