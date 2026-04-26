import listProducts from '#api/products/listProducts';
import { Suspense } from 'react';
import FeaturedProductsView from './FeaturedProducts.view';

export default function FeaturedProducts() {
	const products = loadFeaturedProducts();

	return (
		<Suspense fallback={<div>Loading featured products...</div>}>
			<FeaturedProductsView products={products} />
		</Suspense>
	);
}

async function loadFeaturedProducts() {
	const result = await listProducts({
		featured: true,
		limit: 6,
	});

	return result?.data ?? [];
}
