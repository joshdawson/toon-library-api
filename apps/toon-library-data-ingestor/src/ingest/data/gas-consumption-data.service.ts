import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyType, EnergyUsageDto, EnergyUsageUnit } from '@toon-library-api/models';
import { Repository } from 'typeorm';

import { RawGasData } from '../models/raw-data';
import { DataService } from './data.service';

type GasConsumptionData = Omit<EnergyUsageDto, 'id'>;

@Injectable()
export class GasConsumptionDataService extends DataService<GasConsumptionData, RawGasData> {
  constructor(
    @InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>
  ) {
    super();
  }

  public async insert(data: GasConsumptionData[]): Promise<void> {
    const result = await this.energyUsageRepo.insert(data);
    if (!result) {
      throw new Error('Error inserting gas consumption data');
    }
  }

  public mapData(rawData: RawGasData[]): GasConsumptionData[] {
    const usages: GasConsumptionData[] = []

    for (const entry of rawData) {
      const { Date: month, ...values } = entry;

      for (const [year, value] of Object.entries(values)) {
        if (!value?.length) {
          continue;
        }

        usages.push({
          month,
          year: Number(year),
          energyType: EnergyType.gas,
          unit: EnergyUsageUnit.kWh,
          value,
        });
      }
    }

    return usages;
  }

}
