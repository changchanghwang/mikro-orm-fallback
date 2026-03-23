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

### Bun

```bash
bun install
```

### npm

```bash
npm install
```

### pnpm

```bash
pnpm install
```

## Reproduce

### Bun direct TypeScript execution

```bash
bun run src/app.ts
```

or

```bash
bun dev
```

Expected result with Bun direct execution:

```txt
Task PATH_SYMBOL = Task
[discovery] - processing entity Task (Task)
MetadataError: Source file './Task' not found.
```

### npm / pnpm via tsx

```bash
npm run start
```

```bash
pnpm start
```

### Bun using the same package script path

```bash
bun run start
```

If you want Bun's direct TS runtime specifically, use `bun run src/app.ts` or `bun run dev:bun`.

Expected result with `tsx` (`npm`/`pnpm`/`bun run start`):

```txt
Task PATH_SYMBOL = file:///.../src/models/tasks/model.ts
[discovery] - processing entity Task (file:///.../src/models/tasks/model.ts)
[discovery] - entity discovery finished, found 1 entities
```

## What this shows

- `npm` and `pnpm` can install and run this repository successfully via `tsx`
- `bun run src/app.ts` reproduces the path detection failure
- The difference is the runtime/stack format, not the dependency graph or package manager

No database connection is required to hit the failure. Discovery crashes before connect.
