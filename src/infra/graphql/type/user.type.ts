import { IUserModel } from '@domain/model/database/user';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType implements IUserModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
