# MikroORM TsMorph inherited property issue

Minimal repo for a MikroORM v7 `TsMorphMetadataProvider` issue.

## Bug

When an entity inherits an `@Property()` field from a base class and that inherited field does not declare an explicit decorator `type`, metadata discovery can fail with:

```txt
TypeError: Cannot read properties of undefined (reading 'replace')
    at TsMorphMetadataProvider.cleanUpTypeTags (.../TsMorphMetadataProvider.js:65:19)
    at TsMorphMetadataProvider.initPropertyType (.../TsMorphMetadataProvider.js:75:22)
    at TsMorphMetadataProvider.initProperties (.../TsMorphMetadataProvider.js:42:12)
```

## Trigger shape

```ts
// src/models/base/model.ts
@Property()
private createBy!: string;
```

```ts
// src/models/tasks/model.ts
export class Task extends BaseEntity<Task> {}
```

## Why this seems to happen

`meta.properties` includes inherited properties, but `readTypeFromSource()` only looks up the property on the subclass declaration via `source.getClass(meta.className).getInstanceProperties()`. When the inherited property is not found there, fallback type resolution can stay `undefined`, and `cleanUpTypeTags()` crashes on `type.replace(...)`.

## Expected behavior

MikroORM should either:

1. resolve the property from the parent class hierarchy, or
2. throw a clear `MetadataError` for the unresolved property.
