import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnergyUsage } from '../db/energy-usage';
import { EnergyUsageService } from './energy-usage.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnergyUsage]),],
  providers: [EnergyUsageService],
  exports: [EnergyUsageService],
})
export class IngestModule {}
