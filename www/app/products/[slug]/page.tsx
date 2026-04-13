import type { Product, StoreConfiguration } from '#api/api.types';
import getProductDetail from '#api/products/getProductDetail';
import getStock from '#api/stock/getStock';
import getStoreConfiguration from '#api/store/getStoreConfiguration';
import formatPageTitle from '#lib/formatPageTitle';
import type { Metadata } from 'next';
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

export async function generateMetadata(
	p: PageProps<'/products/[slug]'>,
): Promise<Metadata> {
	'use cache';

	const [config, product] = await Promise.all([
		getStoreConfiguration(),
		(async () => {
			const { slug } = await p.params;
			return getProductDetail(slug);
		})(),
	]);

	if (!product) {
		notFound();
	}

	return transformMetadata(config, product);
}

function transformMetadata(
	config: StoreConfiguration | null,
	product: Product,
): Metadata {
	return {
		...(product.description ? { description: product.description } : {}),

		openGraph: {
			images: product.images?.map((url) => ({ url })) ?? [],
			...(product.name ? { title: product.name } : {}),
			...(product.description ? { description: product.description } : {}),
		},

		title: formatPageTitle(config, product.name ?? 'Product Detail'),
	};
}
