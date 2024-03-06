import { Injectable } from '@nestjs/common';
import csv from 'csvtojson';
import * as path from 'path';

import { CsvDataMapperService } from './csv-data-mapper.service';
import { RawElectricityData } from './models/raw-data';



@Injectable()
export class CsvReaderService {
  constructor(private dataMapper: CsvDataMapperService) {}

  public async readElectricityConsumption() {
    const dataPath = path.join(__dirname, 'assets', 'elec-consumption.csv');

    const jsonData = await csv().fromFile(dataPath) as RawElectricityData[];
    
    const mappedData = this.dataMapper.mapElectricityUsage(jsonData);

    return mappedData;
  }
}
