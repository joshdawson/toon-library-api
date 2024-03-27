import { cleanEnv, str, json } from 'envalid';

export const env = cleanEnv(process.env, {
  GITHUB_TOKEN: str(),
  DATA_SETS: json<string[]>({
    default: [],
  }),
});
