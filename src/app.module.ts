import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [],
  providers: [],
})
export class AppModule {}
