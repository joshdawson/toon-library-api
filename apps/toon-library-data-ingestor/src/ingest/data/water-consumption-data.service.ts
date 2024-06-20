import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyType, EnergyUsageDto, EnergyUsageUnit } from '@toon-library-api/models';
import { Repository } from 'typeorm';

import { RawWaterData } from '../models/raw-data';
import { DataService } from './data.service';

type WaterConsumptionData = Omit<EnergyUsageDto, 'id'>;

@Injectable()
export class WaterConsumptionDataService extends DataService<WaterConsumptionData, RawWaterData> {
  constructor(
    @InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>
  ) {
    super();
  }

  public async insert(data: WaterConsumptionData[]) {
    const result = await this.energyUsageRepo.insert(data);
    if (!result) {
      throw new Error('Error inserting water consumption data');
    }
  }

  public mapData(raw: RawWaterData[]): WaterConsumptionData[] {
    const usages: WaterConsumptionData[] = []

    for (const entry of raw) {
      const { Date: month, ...values } = entry;

      for (const [year, value] of Object.entries(values)) {
        usages.push({
          month,
          year: Number(year),
          energyType: EnergyType.water,
          unit: EnergyUsageUnit.m3,
          value,
          monthLower: month.toLowerCase(),
        });
      }
    }

    return usages;
  }
}
