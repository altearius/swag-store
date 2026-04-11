import type { Readable } from 'openapi-typescript-helpers';
import type { components } from '../../openapi.yaml';

type Result = components['schemas']['ProductListResponse'];
type ResultItem = NonNullable<Result['data']>[number];

export default function transformResult(result: Readable<Result> | undefined) {
	if (!result) {
		return null;
	}

	const { data: rawData = [], ...rest } = result;

	const data: readonly ReturnType<typeof transformItem>[] =
		Array.from(rawData).map(transformItem);

	return { ...rest, data } as const;
}

function transformItem(item: Readable<ResultItem>) {
	const {
		createdAt: rawCreatedAt,
		images: rawImages,
		tags: rawTags,
		...rest
	} = item;

	const createdAt = rawCreatedAt ? new Date(rawCreatedAt) : null;

	const images: readonly string[] | null = rawImages
		? Array.from(rawImages)
		: null;

	const tags: ReadonlySet<string> | null = rawTags
		? new Set(Array.from(rawTags))
		: null;

	return {
		...rest,
		...(createdAt ? { createdAt } : {}),
		...(images ? { images } : {}),
		...(tags ? { tags } : {}),
	} as const;
}
