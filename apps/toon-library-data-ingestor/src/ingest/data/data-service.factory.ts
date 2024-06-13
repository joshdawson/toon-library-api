import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { DataService } from './data.service';
import { ElectricityConsumptionDataService } from './electricity-consumption-data.service';
import { GasConsumptionDataService } from './gas-consumption-data.service';
import { WaterConsumptionDataService } from './water-consumption-data.service';

@Injectable()
export class DataServiceFactory {
  constructor(private moduleRef: ModuleRef) {}

  public async getService(dataName: string): Promise<DataService<any, any>> {
    switch (dataName) {
      case 'electricity-consumption': {
        return this.moduleRef.create(ElectricityConsumptionDataService);
      }

      case 'water-consumption': {
        return this.moduleRef.create(WaterConsumptionDataService);
      }

      case 'gas-consumption': {
        return this.moduleRef.create(GasConsumptionDataService);
      }

      default: {
        throw new Error(`Data service not found for data set ${dataName}`);
      }
    }
  }
}
