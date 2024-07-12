import { DataSource } from 'typeorm';
import { ApplicationVariables, ConfigService, EnvSchemaConfig } from './config';
import { typeORMFactory } from './factories/typeorm.factory';
import { Logger } from '@nestjs/common';

async function migrate() {
  const configService = new ConfigService<ApplicationVariables>(
    EnvSchemaConfig,
  );

  const options = typeORMFactory(configService);

  let datasource = new DataSource({
    type: 'sqlite',
    database: options.database as string,
    migrations: options.migrations,
  });
  const logger = new Logger('Migrations');

  logger.warn(`Total de migrations: ${datasource.migrations.length}`);
  datasource = await datasource.initialize();
  logger.warn('Running migrations...');
  await datasource.runMigrations();
  logger.warn('All Migrations executed successfully!');
  await datasource.destroy();
}

migrate();
