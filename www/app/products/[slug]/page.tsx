import ProductDetailPage from '../../../components/pdp/ProductDetailPage';

export default async function Page(p: PageProps<'/products/[slug]'>) {
	const { slug } = await p.params;

	return <ProductDetailPage productId={slug} />;
}
