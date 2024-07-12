import Joi from 'joi';

import { ConfigService } from './config.service';
describe('Config Service - Unit test', () => {
  test('Given a schema and a valid envs, when create a new instance, then it should return a new instance of ConfigService', () => {
    const schema = Joi.object<{
      PORT: number;
      HOST: string;
    }>({
      PORT: Joi.number().required(),
      HOST: Joi.string().required(),
    });

    const values: Record<string, string> = {
      PORT: '3000',
      HOST: 'localhost',
    };
    const configService = new ConfigService(schema, values);
    expect(configService).toBeInstanceOf(ConfigService);

    expect(configService.get('HOST')).toBe('localhost');
    expect(typeof configService.get('PORT')).toBe('number');
    expect(configService.get('PORT')).toBe(3000);
  });

  test('Given a schema and invalid envs, when create a new instance, then it should throw an error', () => {
    interface SchemaType {
      PORT: number;
      HOST: string;
    }
    const schema = Joi.object<SchemaType>({
      PORT: Joi.number().required(),
      HOST: Joi.string().required(),
    });

    const values: Record<string, unknown> = {
      PORT: '3000',
    };

    expect(() => {
      // eslint-disable-next-line no-new
      return new ConfigService(schema, values);
    }).toThrowError();
  });

  test('Given only a schema, when create a new instance, then it should create config service with process env and stripe envs that is not present in schema', () => {
    interface SchemaType {
      PORT: number;
      HOST: string;
    }
    const schema = Joi.object<SchemaType>({
      PORT: Joi.number().required(),
      HOST: Joi.string().required(),
    });

    const processEnvSpy = vitest.spyOn(process, 'env', 'get');
    processEnvSpy.mockReturnValueOnce({
      PORT: '3000',
      HOST: 'localhost',
      OTHER_ENV: 'other',
    });

    const configService = new ConfigService(schema);
    expect(configService).toBeInstanceOf(ConfigService);

    expect(configService.get('HOST')).toBeDefined();
    expect(configService.get('PORT')).toBeDefined();
    expect(configService.get('HOST')).toEqual('localhost');
    expect(configService.get('PORT')).toEqual(3000);
    expect(configService.get('OTHER_ENV' as any)).toBeUndefined();
  });
});
