interface Props {
	readonly productId: string;
}

export default function ProductDetailPage(p: Props) {
	return <p>Product Detail Page for {p.productId}</p>;
}
