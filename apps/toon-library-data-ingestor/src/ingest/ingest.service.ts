import { Injectable } from '@nestjs/common';

import { env } from '../config/config';
import { DataServiceFactory } from './data/data-service.factory';
import { IngestConfigService } from './ingest.config.service';

@Injectable()
export class IngestService {
  constructor(
    private ingestConfigService: IngestConfigService,
    private dataFetcherFactoryService: DataServiceFactory,
  ) {}

  public async ingest() {
    const config = await this.ingestConfigService.config();

    const dataSetsToRun = env.DATA_SETS.length > 0 ? env.DATA_SETS : Object.keys(config);

    for (const dataSet of dataSetsToRun) {
      const service = await this.dataFetcherFactoryService.getService(dataSet);
      const dataSetConfig = config[dataSet];
      if (!dataSetConfig) {
        throw new Error(`Missing data set config for ${dataSet}`);
      }

      const downloadUrl = dataSetConfig['download-url'];
      if (!downloadUrl) {
        throw new Error(`Missing download URL for ${dataSet}`);
      }

      await service.ingest(downloadUrl);
    }
  }
}
