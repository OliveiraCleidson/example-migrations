import Joi from 'joi';

export type EnvironmentVariables = {
  NODE_ENV: 'local' | 'production';
};

export class ConfigService<
  T extends EnvironmentVariables = EnvironmentVariables,
> {
  private readonly envs: T;
  constructor(
    private readonly schema: Joi.ObjectSchema<T>,
    envs?: Record<string, unknown>,
  ) {
    const { error, value } = this.schema.validate(envs ?? process.env, {
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error !== undefined) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    this.envs = value;
  }

  get<K extends keyof T>(key: K): T[K] {
    return this.envs[key];
  }
}
