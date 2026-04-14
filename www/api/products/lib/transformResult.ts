import type { Readable } from 'openapi-typescript-helpers';
import transformProduct from '../../lib/transformProduct';
import type { components } from '../../openapi.d.yaml';

type Result = components['schemas']['ProductListResponse'];

export default function transformResult(result: Readable<Result> | undefined) {
	if (!result) {
		return null;
	}

	const { data: rawData = [], ...rest } = result;

	const data: readonly ReturnType<typeof transformProduct>[] =
		Array.from(rawData).map(transformProduct);

	return { ...rest, data } as const;
}
