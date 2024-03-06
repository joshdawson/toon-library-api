import 'dotenv/config';

import { Injectable } from '@nestjs/common';

type ConfigKeys = 'DB_HOST' | 'DB_NAME' | 'DB_PORT' | 'DB_USERNAME' | 'DB_PWD';

@Injectable()
export class ConfigService {
  public getConfigValue<T>(configKey: ConfigKeys) {
    const value  = process.env[configKey];
    if (!value) {
      throw new Error(`Missing env variable ${configKey}`);
    }

    return value as T;
  }
}
