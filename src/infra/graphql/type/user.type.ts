import { IUserModel } from '@domain/model/database/user';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType implements IUserModel {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;
}
