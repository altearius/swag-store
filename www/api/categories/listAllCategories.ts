import { cacheLife } from 'next/cache';
import createClient from '../createClient';
import type { components } from '../openapi-types';

type Category = components['schemas']['Category'];
type CategoryDetail = Omit<Category, 'slug'>;

export default async function listAllCategories(): Promise<
	ReadonlyMap<string, CategoryDetail>
> {
	'use cache';
	cacheLife('hours');

	const client = createClient();
	const result = await client.GET('/categories');

	// I'm not sure I understand why the API returns an array rather than an
	// object map with "slug" as the key. Am I supposed to infer a significance
	// to the order of the items? Should I assume that "slug" is somehow
	// not unique? Is there supposed to be pagination maybe?

	const categories = result.data?.data || [];

	return Array.from(categories).reduce((acc, { slug, ...rest }) => {
		if (slug) {
			acc.set(slug, rest);
		}

		return acc;
	}, new Map<string, CategoryDetail>());
}
