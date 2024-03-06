import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { EnergyUsage } from './entities/energy-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnergyUsage]),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.getConfigValue('DB_HOST'),
        port: configService.getConfigValue('DB_PORT'),
        database: configService.getConfigValue('DB_NAME'),
        synchronize: true,
        username: configService.getConfigValue('DB_USERNAME'),
        password: configService.getConfigValue('DB_PWD'),
        entities: [EnergyUsage],
        useUnifiedTopology: true,
        useNewUrlParser: true,
        authSource: 'admin',
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule.forFeature([EnergyUsage])],
})
export class DBModule {}
