import { Query, Resolver } from '@nestjs/graphql';

import { EnergyConsumption } from './energy-consumption.model';
import { EnergyConsumptionService } from './energy-consumption.service';

@Resolver(() => EnergyConsumption)
export class EnergyConsumptionResolver {
  constructor(private energyConsumptionService: EnergyConsumptionService) {}

  @Query(() => [EnergyConsumption])
  public async energyConsumptions() {
    return this.energyConsumptionService.getEnergyConsumptions();
  }
}
