import type getProductDetail from '#api/products/getProductDetail';

type Product = NonNullable<Awaited<ReturnType<typeof getProductDetail>>>;

interface Props {
	readonly product: Product;
}

export default function ProductDetailPage(p: Props) {
	return <p>Product Detail Page for {p.product.name}</p>;
}
