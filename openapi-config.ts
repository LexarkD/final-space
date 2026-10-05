import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
  schemaFile: 'https://api.spaceflightnewsapi.net/v4/schema/',
  apiFile: './src/api/baseNewsApi.ts',
  apiImport: 'baseNewsApi',
  outputFile: './src/api/newsOpenApi.ts',
  exportName: 'newsOpenApi.ts',
  hooks: true,
};

export default config;
