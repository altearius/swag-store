import getProductDetail from '#api/products/getProductDetail';
import { notFound } from 'next/navigation';
import ProductDetailPage from '../../../components/pdp/ProductDetailPage';

export default async function Page(p: PageProps<'/products/[slug]'>) {
	'use cache';

	const { slug } = await p.params;
	const product = await getProductDetail(slug);

	if (!product) {
		notFound();
	}

	return <ProductDetailPage product={product} />;
}
