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
        synchronize: configService.env().DB_SYNC,
        url: configService.env().DB_CONN_STR,
        entities: [EnergyUsage],
        useUnifiedTopology: true,
        useNewUrlParser: true,
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
