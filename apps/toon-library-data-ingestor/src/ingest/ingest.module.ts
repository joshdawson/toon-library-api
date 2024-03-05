import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnergyUsage } from '../db/energy-usage';
import { CsvDataMapperService } from './csv-data-mapper.service';
import { CsvReaderService } from './csv-reader.service';
import { EnergyUsageService } from './energy-usage.service';
import { IngestService } from './ingest.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnergyUsage]),],
  providers: [
    EnergyUsageService,
    CsvReaderService,
    IngestService,
    CsvDataMapperService,
  ],
  exports: [IngestService],
})
export class IngestModule {}
