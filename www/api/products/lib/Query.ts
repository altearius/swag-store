import type { operations } from '#api/openapi-types';

export type Query = NonNullable<
	operations['listProducts']['parameters']['query']
>;
