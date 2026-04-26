import type { Product, StoreConfiguration } from '#api/api.types';
import getProductDetail from '#api/products/getProductDetail';
import listProducts from '#api/products/listProducts';
import getStoreConfiguration from '#api/store/getStoreConfiguration';
import ProductDetailPage from '#c/pdp/ProductDetailPage';
import formatPageTitle from '#lib/formatPageTitle';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';

export default async function Page(p: PageProps<'/products/[slug]'>) {
	'use cache';
	cacheLife('hours');

	const product = await loadProduct(p);

	if (!product) {
		notFound();
	}

	return <ProductDetailPage product={product} />;
}

export async function generateMetadata(
	p: PageProps<'/products/[slug]'>,
): Promise<Metadata> {
	'use cache';
	cacheLife('hours');

	const [config, product] = await Promise.all([
		getStoreConfiguration(),
		loadProduct(p),
	]);

	if (!product) {
		notFound();
	}

	return transformMetadata(config, product);
}

async function loadProduct(p: PageProps<'/products/[slug]'>) {
	const { slug } = await p.params;
	return getProductDetail(slug);
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

export async function generateStaticParams() {
	const featured = await listProducts({ featured: true, limit: 6 });

	return (
		featured?.data
			.map((product) => product.slug)
			.filter((x): x is NonNullable<typeof x> => Boolean(x))
			.map((slug) => ({ slug })) ?? []
	);
}
