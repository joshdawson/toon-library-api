import { Module } from '@nestjs/common';
import { DBModule } from '@toon-library-api/db';

import { DataServiceFactory } from './data/data-service.factory';
import { ElectricityConsumptionDataService } from './data/electricity-consumption-data.service';
import { IngestConfigService } from './ingest.config.service';
import { IngestService } from './ingest.service';

@Module({
  imports: [DBModule],
  providers: [
    IngestService,
    IngestConfigService,
    DataServiceFactory,
    ElectricityConsumptionDataService,
  ],
  exports: [IngestService],
})
export class IngestModule {}
