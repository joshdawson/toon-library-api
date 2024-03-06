import { Module } from '@nestjs/common';
import { DBModule } from '@toon-library-api/db';

import { EnergyUsageService } from './energy-usage.service';
import { EnergyUsageResolver } from './energy-usage.resolver';

@Module({
  imports: [DBModule],
  providers: [EnergyUsageResolver, EnergyUsageService],
})
export class APIModule {}
