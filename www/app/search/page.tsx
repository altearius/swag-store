import listAllCategories from '#api/categories/listAllCategories';
import Search from '../../components/search/Search';

export default async function Page() {
	const categories = listAllCategories();
	return <Search categories={categories} />;
}
