import { Module } from '@nestjs/common';
import { DBModule } from '@toon-library-api/db';

import { IngestModule } from '../ingest/ingest.module';
import { AppService } from './app.service';

@Module({
  imports: [
    DBModule,
    IngestModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
