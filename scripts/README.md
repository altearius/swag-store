# Development Scripts

This sub-repository contains various scripts that are useful during development.

## API Proxy

While investigating the effects of various cache directives on API fetching,
I found it useful to have direct visibility into the HTTP requests being made.
[Prism][4] is provided for this purpose. Prism may be started in proxy
mode using:

```sh
yarn workspace scripts start-proxy
```

The value of `Api_Base_Url` in the `.env` file may now be set to use Prism
rather than directly accessing the upstream API; e.g.:

```
Api_Base_Url=http://localhost:4010
```

This intercepts upstream API requests and provides insight into the actual
traffic around the cache.

## Static Type Gen

This script is responsible for generating TypeScript interfaces based on the
OpenAPI document provided in the exercise.

It is assumed the OpenAPI specification will rarely change. Because of this,
both the source document and the generated types are committed to source
control, even though it is usually inadvisable to commit generated code.

If the OpenAPI specification changes for any reason, the generated types may
be updated:

```sh
yarn workspace scripts node ./staticTypeGen.ts
```

### Lessons Learned

Ideally, the output file would be named `openapi.d.yaml.ts` and live alongside
the source `openapi.yaml` file.

If the `tsconfig.json` setting [allowArbitraryExtensions][1] is turned on, this
allows us to import types directly from the `.yaml` file, as TypeScript will
know to resolve `import { } from "openapi.yaml"` to the corresponding
`openapi.d.yaml.ts` file.

Sadly, this produces a deployment error in Vercel:

```
Detected Next.js version: 16.2.3
Running "yarn run build"
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

▲ Next.js 16.2.3 (Turbopack)
- Cache Components enabled

  Creating an optimized production build ...
✓ Compiled successfully in 5.7s
  Running TypeScript ...
  Finished TypeScript in 3.5s ...
  Collecting page data using 1 worker ...
  Generating static pages using 1 worker (0/13) ...
  Generating static pages using 1 worker (3/13)
  Generating static pages using 1 worker (6/13)
  Generating static pages using 1 worker (9/13)
✓ Generating static pages using 1 worker (13/13) in 5.6s
  Finalizing page optimization ...
  Running onBuildComplete from Vercel

Route (app)                                             Revalidate  Expire
┌ ○ /                                                          15m      1d
├ ○ /_not-found                                                15m      1d
├ ○ /cart                                                      15m      1d
├ ◐ /products/[slug]                                           15m      1d
│ ├ /products/[slug]                                           15m      1d
│ ├ /products/matte-black-stainless-steel-water-bottle         15m      1d
│ ├ /products/black-desk-mat                                   15m      1d
│ └ [+4 more paths]
└ ◐ /search                                                    15m      1d


○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content

Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Using TypeScript 6.0.2 (local user-provided)
Error: Unable to require `.d.ts` file.
This is usually the result of a faulty configuration or import. Make sure there is a `.js`, `.json` or another executable extension and loader (attached before `ts-node`) available alongside `openapi.d.yaml.ts`.
```

Notably, the error happens _after_ the build has completed. I presume that the
"Using TypeScript..." statements refer to various serverless functions being
set up.

The actual error message is:

> Error: Unable to require `.d.ts` file.
>
> This is usually the result of a faulty configuration or import. Make sure
> there is a `.js`, `.json` or another executable extension and loader
> (attached before `ts-node`) available alongside `openapi.d.yaml.ts`.

This appears to be emitted by ts-node, based on [this issue][2].

I made several attempts to solve the problem:

1. Based on the `ts-node` issue description, I tried adding
   `"preserveSymlinks": true` to the project's `tsconfig.json` file. No effect.

2. Based on an unresolved [Stack Overflow][3] question, I attempted to include
   the `openapi.d.yaml.ts` file directly in the `tsconfig.json`
   file's `include` array. No effect.

3. On the theory that there was some issue resolving the arbitrary `.yaml`
   extension, I tried updating the `import` statements to reference the
   `openapi.d.yaml.ts` file directly. No effect.

4. I tried migrating the types into a ambient global `API` namespace, thus
   avoiding the need to import the types at all. This failed because I wanted
   to avoid editing the generated `openapi.d.yaml.ts` file directly, and I
   instead attempted to re-export the types into the namespace. By re-exporting
   the types, I needed to import them at least once, so I was unable to
   completely remove the final `import` statement.

   I think this might have worked if I had been willing to edit the
   `openapi.d.yaml.ts` file itself, but I want a solution that preserves the
   ability to easily regenerate the types if needed.

5. Finally, I renamed the file to follow a different naming scheme. This worked!
   There must be some nuance to how `ts-node` is dealing with TypeScript 5.0's
   ability to [resolve arbitrary extensions][1].

[1]: https://www.typescriptlang.org/tsconfig/#allowArbitraryExtensions 'Allow Arbitrary Extensions'
[2]: https://github.com/TypeStrong/ts-node/issues/797 'ts-node issue'
[3]: https://stackoverflow.com/questions/67113576 'Vercel deployment question'
[4]: https://stoplight.io/open-source/prism 'Prism'
