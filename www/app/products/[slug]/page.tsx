import getProductDetail from '#api/products/getProductDetail';
import getStock from '#api/stock/getStock';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';
import ProductDetailPage from '../../../components/pdp/ProductDetailPage';

export default async function Page(p: PageProps<'/products/[slug]'>) {
	'use cache';
	cacheLife('seconds');

	const { slug } = await p.params;
	const product = await getProductDetail(slug);

	if (!product) {
		notFound();
	}

	return <ProductDetailPage product={product} stock={getStock(slug)} />;
}
