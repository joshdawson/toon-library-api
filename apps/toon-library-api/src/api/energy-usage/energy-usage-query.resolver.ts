import { Args, Query, Resolver } from '@nestjs/graphql';

import { EnergyUsageQueryArgs } from './energy-usage-query.args';
import { EnergyUsageQueryResult } from './energy-usage.model';
import { EnergyUsageService } from './energy-usage.service';

@Resolver(() => EnergyUsageQueryResult)
export class EnergyUsageQueryResolver {
  constructor(private energyUsageService: EnergyUsageService) {}

  @Query(() => EnergyUsageQueryResult)
  public async energyUsages(@Args() args?: EnergyUsageQueryArgs): Promise<EnergyUsageQueryResult> {
    const data = await this.energyUsageService.getEnergyUsages(args);

    return {
      data,
    };
  }
}
