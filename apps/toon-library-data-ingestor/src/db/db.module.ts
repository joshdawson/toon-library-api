import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnergyUsage } from './energy-usage';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnergyUsage]),
  ],
})
export class DBModule {}
