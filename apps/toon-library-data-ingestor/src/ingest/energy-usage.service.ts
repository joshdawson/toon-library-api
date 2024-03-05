import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnergyUsage } from '../db/energy-usage';
import { EnergyUsageDto } from '../models/energy-usage';

@Injectable()
export class EnergyUsageService {
  constructor(@InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>) {}

  public insert(data: EnergyUsageDto[]) {
    return this.energyUsageRepo.insert(data);
  }
}
