import type { operations } from '../../openapi.yaml';

export type Query = NonNullable<
	operations['listProducts']['parameters']['query']
>;
