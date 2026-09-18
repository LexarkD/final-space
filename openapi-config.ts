import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://api.spaceflightnewsapi.net/v4/schema/',
  apiFile: './src/api/baseSplitApi.ts',
  apiImport: 'baseSplitApi',
  outputFile: './src/api/spaceflightNewsApi.ts',
  exportName: 'spaceflightNewsApi.ts',
  hooks: true,
};

export default config;
