import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';
import { run } from 'node:test';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  await appService.run();
  
  console.log('Done');
}

bootstrap();
