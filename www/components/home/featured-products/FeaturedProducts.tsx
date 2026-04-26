import listProducts from '#api/products/listProducts';
import FeaturedProductsView from './FeaturedProducts.view';

export default async function FeaturedProducts() {
	const result = await listProducts({
		featured: true,
		limit: 6,
	});

	const products = result?.data ?? [];

	return <FeaturedProductsView products={products} />;
}
