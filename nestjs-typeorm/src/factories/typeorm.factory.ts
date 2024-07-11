import { join } from 'path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApplicationVariables, ConfigService } from '../config';

const migrationsPath = join(__dirname, '..', 'migrations', '*.{ts,js}');

export function typeORMFactory(
  configService: ConfigService<ApplicationVariables>,
): TypeOrmModuleOptions {
  const config: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: configService.get('DB_PATH'),
    migrations: [migrationsPath],
  };

  console.log(config);
  return config;
}
