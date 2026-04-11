import listProducts from '#api/products/listProducts';
import FeaturedProductsView from './FeaturedProducts.view';

export default async function FeaturedProducts() {
	const result = await listProducts({
		featured: true,
		limit: 6,
	});

	const featured = result?.data ?? [];

	return <FeaturedProductsView products={featured} />;
}
