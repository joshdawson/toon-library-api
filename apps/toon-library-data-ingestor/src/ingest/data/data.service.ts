import axios from 'axios';
import csv from 'csvtojson';

import { env } from '../../config/config';

export abstract class DataService<StorageType, RawDataType> {
  public async ingest(url: string) {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/vnd.github.raw+json',
        'X-Github-Api-Version': '2022-11-28',
        'Authorization': `token ${env.GITHUB_TOKEN}`,
      }
    });

    const jsonData = await csv().fromString(response.data)

    const mapped = this.mapData(jsonData);

    return this.insert(mapped);
  }

  abstract insert(data: StorageType[]): Promise<void>;

  abstract mapData(rawData: RawDataType[]): StorageType[];
}