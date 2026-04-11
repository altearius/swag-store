#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import openapiTS, { astToString } from 'openapi-typescript';

const source = new URL('../www/api/openapi.yaml', import.meta.url);
const destination = new URL('../www/api/openapi.d.yaml.ts', import.meta.url);

const ast = await openapiTS(source, {
	alphabetize: true,
	immutable: true,
});

const contents = astToString(ast);

await writeFile(destination, contents, 'utf-8');
