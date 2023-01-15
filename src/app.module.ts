import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '@infra/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from '@infra/controllers/controller.module';
@Module({
  imports: [UseCasesProxyModule.register(), ControllersModule],
  providers: [],
})
export class AppModule {}
