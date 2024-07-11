import { Global, Module } from '@nestjs/common';
import { ConfigService, EnvSchemaConfig } from './config';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(EnvSchemaConfig),
    },
  ],
  exports: [ConfigService],
})
export class GlobalModule {}
