import { GraphqlModule } from '@infra/config/graphql/graphql.module';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { Module } from '@nestjs/common';
import { QuestionOptionResolver } from './question-option/question-option.resolver';
import { QuestionResolver } from './question/question.resolver';
import { SurveyResolver } from './survey/survey.resolver';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [GraphqlModule, UseCasesProxyModule.register()],
  providers: [
    UserResolver,
    SurveyResolver,
    QuestionResolver,
    QuestionOptionResolver,
  ],
  exports: [],
})
export class ResolversModule {}
