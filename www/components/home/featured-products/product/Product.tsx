import type { Product as ProductModel } from '#api/products/listProducts';

interface Props {
	readonly product: ProductModel;
}

export default function Product(p: Props) {
	return <div>Product: {p.product.name}</div>;
}
