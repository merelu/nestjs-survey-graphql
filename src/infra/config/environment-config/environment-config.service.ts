import { DatabaseConfig } from '@domain/config/database-config.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
  constructor(private configService: ConfigService) {}

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') as number;
  }

  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') as string;
  }

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') as string;
  }

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') as string;
  }

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') as string;
  }

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA') as string;
  }
  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE') as boolean;
  }
}
