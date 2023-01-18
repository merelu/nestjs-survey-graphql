import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from '@infra/controllers/controller.module';
import { ResolversModule } from '@infra/graphql/resolver/resolver.module';
@Module({
  imports: [UseCasesProxyModule.register(), ControllersModule, ResolversModule],
  providers: [],
})
export class AppModule {}
