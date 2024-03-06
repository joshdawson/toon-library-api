import { Module } from '@nestjs/common';

import { EnergyConsumptionResolver } from './energy-consumption.resolver';
import { EnergyConsumptionService } from './energy-consumption.service';

@Module({
  providers: [EnergyConsumptionResolver, EnergyConsumptionService],
})
export class APIModule {}
