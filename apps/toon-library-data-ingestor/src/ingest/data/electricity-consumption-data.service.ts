import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyUsageDto } from '@toon-library-api/models';
import { Repository } from 'typeorm';

import { RawElectricityData } from '../models/raw-data';
import { DataService } from './data.service';

@Injectable()
export class ElectricityConsumptionDataService extends DataService<EnergyUsageDto, RawElectricityData> {
  constructor(
    @InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>
  ) {
    super();
  }

  public async insert(data: EnergyUsageDto[]) {
    const result = await this.energyUsageRepo.insert(data);
    if (!result) {
      throw new Error('Error inserting electricity consumption data');
    }
  }

  public mapData(raw: RawElectricityData[]): EnergyUsageDto[] {
    const usages: EnergyUsageDto[] = []

    for (const entry of raw) {
      const { Date: month, ...values } = entry;

      for (const [year, value] of Object.entries(values)) {
        usages.push({
          month,
          year: Number(year),
          energyType: 'electricity',
          unit: 'kWh',
          value,
        });
      }
    }

    return usages;
  }
}
