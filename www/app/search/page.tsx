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

export async function generateMetadata(): Promise<Metadata> {
	'use cache';

	const config = await getStoreConfiguration();
	return transformMetadata(config);
}

function transformMetadata(config: StoreConfiguration | null): Metadata {
	return { title: formatPageTitle(config, 'Search') };
}
