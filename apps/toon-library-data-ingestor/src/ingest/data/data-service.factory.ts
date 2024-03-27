import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { DataService } from './data.service';
import { ElectricityConsumptionDataService } from './electricity-consumption-data.service';

@Injectable()
export class DataServiceFactory {
  constructor(private moduleRef: ModuleRef) {}

  public async getService(dataName: string): Promise<DataService<any>> {
    switch (dataName) {
      case 'electricity-consumption': {
        return this.moduleRef.create(ElectricityConsumptionDataService);
      }

      default: {
        throw new Error(`Data service not found for data set ${dataName}`);
      }
    }
  }
}
