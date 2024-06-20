import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { DBModule } from '@toon-library-api/db';
import { EnergyType, EnergyUsageUnit } from '@toon-library-api/models';

import { SortType } from './energy-usage/energy-usage-query.args';
import { EnergyUsageQueryResolver } from './energy-usage/energy-usage-query.resolver';
import { EnergyUsageService } from './energy-usage/energy-usage.service';

registerEnumType(EnergyType, {
  name: 'EnergyType',
});

registerEnumType(EnergyUsageUnit, {
  name: 'EnergyUsageUnit',
});

registerEnumType(SortType, {
  name: 'SortType',
});

@Module({
  imports: [DBModule],
  providers: [EnergyUsageQueryResolver, EnergyUsageService],
})
export class APIModule {}
