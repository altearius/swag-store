# Development Scripts

This sub-repository contains various scripts that are useful during development.

## Static Type Gen

This script is responsible for generating TypeScript interfaces based on the
OpenAPI document provided in the exercise.

It is assumed the OpenAPI specification will rarely change. Because of this,
both the source document and the generated types are committed to source
control, even though it is usually inadvisable to commit generated code.

If the OpenAPI specification changes for any reason, the generated types may
be updated:

```bash
yarn workspace scripts node ./staticTypeGen.ts
```
