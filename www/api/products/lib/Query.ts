import type { operations } from '../../openapi.d.yaml';

export type Query = NonNullable<
	operations['listProducts']['parameters']['query']
>;
