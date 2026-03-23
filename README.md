# MikroORM Bun Repro

Minimal reproduction for a MikroORM v7 path discovery failure under:

- Bun direct TypeScript execution
- ES decorators from `@mikro-orm/decorators/es`
- `TsMorphMetadataProvider`

The repo is configured close to the v7 docs baseline:

- `entities` points to compiled JS (`./dist/models/tasks/model.js`)
- `entitiesTs` points to TS source (`./src/models/tasks/model.ts`)
- `preferTs: true` is enabled for direct TS execution
- `moduleResolution: "bundler"`
- `declaration: true`

## Install

```bash
bun install
```

## Reproduce

```bash
bun run src/app.ts
```

or

```bash
bun dev
```

## Expected debug signal

The app logs the entity path symbol before `MikroORM.init()`:

```txt
Task PATH_SYMBOL = Task
```

Then MikroORM discovery fails with:

```txt
[discovery] - processing entity Task (Task)
MetadataError: Source file './Task' not found.
```

No database connection is required to hit the failure. Discovery crashes before connect.
