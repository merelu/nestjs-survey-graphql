import { EnvironmentConfigModule } from '@infra/config/environment-config/environment-config.module';
import { RepositoriesModule } from '@infra/repositories/repositories.module';
import { ExceptionsModule } from '@infra/services/exceptions/exception.module';
import { LoggerModule } from '@infra/services/logger/logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    LoggerModule,
    EnvironmentConfigModule,
    RepositoriesModule,
    ExceptionsModule,
  ],
})
export class UseCasesProxyModule {}
