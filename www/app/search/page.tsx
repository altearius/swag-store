import type { StoreConfiguration } from '#api/api.types';
import listAllCategories from '#api/categories/listAllCategories';
import getStoreConfiguration from '#api/store/getStoreConfiguration';
import Search from '#c/search/Search';
import formatPageTitle from '#lib/formatPageTitle';
import type { Metadata } from 'next';

export default async function Page(p: PageProps<'/search'>) {
	const categories = listAllCategories();
	return <Search categories={categories} searchParams={p.searchParams} />;
}

export async function generateMetadata(
	p: PageProps<'/search'>,
): Promise<Metadata> {
	const [config, search] = await Promise.all([
		getStoreConfiguration(),
		p.searchParams,
	]);

	return transformMetadata(config, search);
}

function transformMetadata(
	config: StoreConfiguration | null,
	search: Record<string, string | string[] | undefined>,
): Metadata {
	const { page, search: searchTerm } = search;
	const isFirstPage = page === undefined || page === '1';
	const hasTerm = searchTerm !== undefined && searchTerm !== '';

	return {
		title: formatPageTitle(config, 'Search'),
		robots: {
			index: isFirstPage && !hasTerm,
			follow: true,
		},
	};
}
