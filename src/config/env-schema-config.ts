import Joi from 'joi';

export interface ApplicationVariables {
  NODE_ENV: 'local' | 'production';
  PORT: number;

  DB_PATH: string;
  MIGRATIONS_RUN_ON_STARTUP: boolean;
}

export const EnvSchemaConfig = Joi.object<ApplicationVariables>({
  NODE_ENV: Joi.string().valid('local', 'production').required(),
  PORT: Joi.number().required(),

  DB_PATH: Joi.string().required(),
  MIGRATIONS_RUN_ON_STARTUP: Joi.boolean().required(),
});
