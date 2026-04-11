import type { Options } from '../listProducts';
import type { Query } from './Query';

export default function transformQuery(o: Options): Query {
	const limit = normalizeNumber(o.limit, 1, 20, 100);
	const page = normalizeNumber(o.page, 1, 1, Number.MAX_SAFE_INTEGER);
	const search = o.search?.trim() || undefined;

	return {
		...(o.category ? { category: o.category } : {}),
		...(typeof o.featured === 'boolean'
			? { featured: o.featured ? 'true' : 'false' }
			: {}),
		...(limit ? { limit } : {}),
		...(page ? { page } : {}),
		...(search ? { search } : {}),
	};
}

function normalizeNumber(
	value: number | undefined,
	minValue: number,
	defaultValue: number,
	maxValue: number,
) {
	if (typeof value === 'undefined') {
		return null;
	}

	const normalized = Math.max(minValue, Math.min(Math.floor(value), maxValue));
	return normalized === defaultValue ? null : normalized;
}
