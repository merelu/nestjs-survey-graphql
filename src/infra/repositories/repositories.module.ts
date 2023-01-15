import { TypeOrmConfigModule } from '@infra/config/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([])],
  providers: [],
  exports: [],
})
export class RepositoriesModule {}
