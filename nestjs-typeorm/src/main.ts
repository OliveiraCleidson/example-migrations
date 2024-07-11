import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Initialize the lifecycle of the application
  // because the ConfigService will be created
  // and will validade the environment variables
  // before the web server starts
  app.init();
  await runMigrations(app);

  // It will only arrive at this part of the code after validation performed by the ConfigService
  const port = Number(process.env.PORT);

  app.listen(port);
}

async function runMigrations(app: INestApplication) {
  const logger = new Logger('Migrations');
  const datasource = app.get<DataSource>(DataSource);
  if (!datasource) {
    throw new Error('Datasource not found');
  }

  // It uses logger.warn to highlight the message in the console
  logger.warn(`Total de migrations: ${datasource.migrations.length}`);
  logger.warn('Running migrations...');
  await datasource.runMigrations();
  logger.warn('All Migrations executed successfully!');
}

bootstrap();
