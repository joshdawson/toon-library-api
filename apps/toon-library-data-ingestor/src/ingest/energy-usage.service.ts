import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnergyUsage } from '../db/energy-usage';

@Injectable()
export class EnergyUsageService {
  constructor(@InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>) {}

  public create(): Promise<EnergyUsage> {
    const usage = new EnergyUsage();
    usage.month = 'January';
    usage.year = 2011;
    usage.energyType = 'electricity';
    usage.unit = 'kWh';

    return this.energyUsageRepo.save(usage);
  }
}
