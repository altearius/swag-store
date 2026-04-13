import listAllCategories from '#api/categories/listAllCategories';
import { isValidCategory } from '#api/products/isValidCategory';
import listProducts from '#api/products/listProducts';
import Search from '../../components/search/Search';

export default async function Page(p: PageProps<'/search'>) {
	const categories = listAllCategories();
	const results = search(p);

	return <Search categories={categories} results={results} />;
}

async function search(p: PageProps<'/search'>) {
	const query = await p.searchParams;
	const category = bindCategory(query);
	const search = bindValue(query['search']);
	const results = await listProducts({ category, limit: 5, search });
	return results?.data ?? [];
}

function bindValue(raw: string | string[] | undefined) {
	return typeof raw === 'string'
		? raw.trim() || undefined
		: raw
			? raw[0]?.trim() || undefined
			: undefined;
}

function bindCategory(query: Record<string, string | string[] | undefined>) {
	const raw = bindValue(query['category']);

	if (!raw) {
		return undefined;
	}

	if (!isValidCategory(raw)) {
		return undefined;
	}

	return raw;
}
