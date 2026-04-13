import listAllCategories from '#api/categories/listAllCategories';
import Search from '../../components/search/Search';

export default async function Page(p: PageProps<'/search'>) {
	const categories = listAllCategories();
	return <Search categories={categories} searchParams={p.searchParams} />;
}
