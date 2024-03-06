import { Query, Resolver } from '@nestjs/graphql';

import { EnergyUsage } from './energy-usage.model';
import { EnergyUsageService } from './energy-usage.service';

@Resolver(() => EnergyUsage)
export class EnergyUsageResolver {
  constructor(private energyUsageService: EnergyUsageService) {}

  @Query(() => [EnergyUsage])
  public async energyConsumptions() {
    return this.energyUsageService.getEnergyUsages();
  }
}
