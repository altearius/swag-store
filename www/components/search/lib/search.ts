import listProducts from '#api/products/listProducts';
import bindCategory from './bindCategory';
import bindPage from './bindPage';
import bindValue from './bindValue';

export default async function search(
	searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
	const query = await searchParams;
	const category = bindCategory(query['category']);
	const term = bindValue(query['search']);
	const page = bindPage(query['page']) ?? 1;
	return listProducts({ category, limit: 5, page, search: term });
}
