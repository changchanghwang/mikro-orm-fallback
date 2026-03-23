import { defineConfig } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '1234',
  dbName: 'mk_test',
  metadataProvider: TsMorphMetadataProvider,
  metadataCache: { enabled: false },
  forceUndefined: true,
  debug: true,
  baseDir: process.cwd(),
  preferTs: true,
  entities: ['./dist/models/tasks/model.js'],
  entitiesTs: ['./src/models/tasks/model.ts'],
});
