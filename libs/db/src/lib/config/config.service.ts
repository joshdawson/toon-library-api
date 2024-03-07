import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { bool, cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  DB_CONN_STR: str(),
  DB_SYNC: bool({
    default: false,
  }),
});

@Injectable()
export class ConfigService {
  public env() {
    return env;
  }
}
