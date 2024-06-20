import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnergyUsage } from '@toon-library-api/db';
import { EnergyType, EnergyUsageDto, EnergyUsageUnit } from '@toon-library-api/models';
import { Repository } from 'typeorm';

import { RawElectricityData } from '../models/raw-data';
import { DataService } from './data.service';

type ElectricityConsumptionData = Omit<EnergyUsageDto, 'id'>

@Injectable()
export class ElectricityConsumptionDataService extends DataService<ElectricityConsumptionData, RawElectricityData> {
  constructor(
    @InjectRepository(EnergyUsage) private energyUsageRepo: Repository<EnergyUsage>
  ) {
    super();
  }

  public async insert(data: ElectricityConsumptionData[]) {
    const result = await this.energyUsageRepo.insert(data);
    if (!result) {
      throw new Error('Error inserting electricity consumption data');
    }
  }

  public mapData(raw: RawElectricityData[]): ElectricityConsumptionData[] {
    const usages: ElectricityConsumptionData[] = []

    for (const entry of raw) {
      const { Date: month, ...values } = entry;

      for (const [year, value] of Object.entries(values)) {
        usages.push({
          month,
          year: Number(year),
          energyType: EnergyType.electricity,
          unit: EnergyUsageUnit.kWh,
          value,
          monthLower: month.toLowerCase(),
        });
      }
    }

    return usages;
  }
}
