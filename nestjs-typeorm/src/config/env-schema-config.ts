import Joi from 'joi';

export interface ApplicationVariables {
  NODE_ENV: 'local' | 'production';
  PORT: number;

  DB_PATH: string;
}

export const EnvSchemaConfig = Joi.object<ApplicationVariables>({
  NODE_ENV: Joi.string().valid('local', 'production').required(),
  PORT: Joi.number().required(),

  DB_PATH: Joi.string().required(),
});
