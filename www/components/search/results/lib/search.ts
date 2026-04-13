import listProducts from '#api/products/listProducts';
import bindCategory from './bindCategory';
import bindValue from './bindValue';

export default async function search(
	searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
	const query = await searchParams;
	const category = bindCategory(query);
	const term = bindValue(query['search']);
	return listProducts({ category, limit: 5, search: term });
}
