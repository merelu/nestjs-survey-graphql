import { CreateUserModel } from '@domain/model/database/user';
import { UserType } from '@infra/graphql/type/user.type';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserUseCases } from '@usecases/user/create-user.usecases';
import { GetCompletedSurveyUseCases } from '@usecases/survey/get-completed-survey.usecases';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => UserType)
export class UserResolver {
  constructor(
    @Inject(UseCasesProxyModule.CREATE_USER_USECASES_PROXY)
    private readonly createUserUseCasesProxy: UseCaseProxy<CreateUserUseCases>,
    @Inject(UseCasesProxyModule.GET_COMPLETED_SURVEY_USECASES_PROXY)
    private readonly getCompletedSurveyUseCasesProxy: UseCaseProxy<GetCompletedSurveyUseCases>,
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
