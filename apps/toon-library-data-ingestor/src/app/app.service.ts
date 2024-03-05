import { Injectable } from '@nestjs/common';

import { IngestService } from '../ingest/ingest.service';

@Injectable()
export class AppService {
  constructor(private ingestService: IngestService) {}

  public async run(): Promise<void> {
    try {
      await this.ingestService.ingest();
      console.log('Finished ingesting');
    } catch (error) {
      console.error(error);
    }
  }
}
