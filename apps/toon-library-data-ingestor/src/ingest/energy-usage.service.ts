import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyUsageDto } from '@toon-library-api/models';
import { Repository } from 'typeorm';

@Injectable()
export class EnergyUsageService {
  constructor(@InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>) {}

  public insert(data: EnergyUsageDto[]) {
    return this.energyUsageRepo.insert(data);
  }
}
