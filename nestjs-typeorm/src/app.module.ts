import { Module } from '@nestjs/common';
import { ConfigService } from './config';
import { HealthController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMFactory } from './factories/typeorm.factory';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeORMFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
