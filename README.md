# Vercel Swag Store

This is an implementation of the [Vercel Swag Store certification project][1].

Find the password for the project description either in the email or in the
`.env` file comments.

## Prerequisites

- Node 24
- Yarn

## Getting Started

1. `yarn install`

2. Make a copy of the `.env.example` file named `.env`. Populate this file with
   appropriate values. Each value is documented with instructions.

## Developer Scripting

The following scripts are available:

- `yarn build` - Compile all TypeScript.
- `yarn dev` - Start the Next.js dev server.
- `yarn fmt` - Format all files.
- `yarn lint` - Static code analysis.
- `yarn lint-ts` - Lint for TypeScript only, supports `--fix` argument.
- `yarn lint-css` - Lint for CSS only, supports `--fix` argument.
- `yarn test` - Run tests
- `yarn workspace scripts start-mock` - Start mock server
- `yarn workspace scripts start-proxy` - Start proxy server

[1]: https://vercel-certification-assignments.vercel.app/vercel-swag-store 'Vercel Swag Store Certification Project'
