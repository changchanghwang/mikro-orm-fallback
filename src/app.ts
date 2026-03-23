import { MetadataStorage } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/mysql';
import config from './mikro-orm.config';
import { Task } from './models/tasks/model';

type EntityClassWithPathSymbol = typeof Task & {
  [MetadataStorage.PATH_SYMBOL]?: string;
};

async function main() {
  console.log('Task PATH_SYMBOL =', (Task as EntityClassWithPathSymbol)[MetadataStorage.PATH_SYMBOL]);

  const orm = await MikroORM.init(config);

  const discoveredEntities = Array.from(orm.getMetadata().getAll().values()).map(
    (meta) => `${meta.className} (${meta.path})`,
  );

  console.log('discovered entities:', discoveredEntities);

  await orm.close(true);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
