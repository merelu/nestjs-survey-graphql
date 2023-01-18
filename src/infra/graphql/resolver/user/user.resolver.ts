import { CreateUserModel } from '@domain/model/database/user';
import { UserType } from '@infra/graphql/type/user.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { BadRequestException, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserUseCases } from '@usecases/user/create-user.usecases';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUseCasesProxy: UseCaseProxy<CreateUserUseCases>,
  ) {}

  @Mutation(() => UserType)
  async createUser(
    @Args('createUserInput') data: CreateUserInput,
  ): Promise<UserType> {
    const newUser = new CreateUserModel();
    newUser.name = data.name;

    const result = await this.createUserUseCasesProxy
      .getInstance()
      .execute(newUser);

    return result;
  }
}
