import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import yaml from 'js-yaml';
import * as path from 'path';

type IngestConfig = {
  [key: string]: {
    'download-url': string;
  };
};

@Injectable()
export class IngestConfigService {
  private _config?: IngestConfig;

  public config() {
    return this._config ?? this.loadConfig();
  }

  private async loadConfig() {
    const fileContents = await fs.readFile(path.join(__dirname, 'assets', 'open-data-config.yml'), 'utf-8');
    const doc = yaml.load(fileContents) as IngestConfig;

    this._config = doc;

    return this._config;
  }
}

