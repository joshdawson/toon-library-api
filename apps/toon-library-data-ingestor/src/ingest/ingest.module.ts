import { Module } from '@nestjs/common';
import { DBModule } from '@toon-library-api/db';

import { CsvDataMapperService } from './csv-data-mapper.service';
import { CsvReaderService } from './csv-reader.service';
import { IngestService } from './ingest.service';
import { EnergyUsageService } from './energy-usage.service';

@Module({
  imports: [DBModule],
  providers: [
    EnergyUsageService,
    CsvReaderService,
    IngestService,
    CsvDataMapperService,
  ],
  exports: [IngestService],
})
export class IngestModule {}
