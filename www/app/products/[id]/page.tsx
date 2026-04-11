import ProductDetailPage from '../../../components/pdp/ProductDetailPage';

export default async function Page(p: PageProps<'/products/[id]'>) {
	const { id } = await p.params;

	return <ProductDetailPage productId={id} />;
}
