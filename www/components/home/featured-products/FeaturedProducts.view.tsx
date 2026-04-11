import type listProducts from '#api/products/listProducts';

type ProductList = NonNullable<Awaited<ReturnType<typeof listProducts>>>;
type Product = ProductList['data'][number];

interface Props {
	readonly products: readonly Product[];
}

export default function FeaturedProductsView(p: Props) {
	if (p.products.length === 0) {
		return null;
	}

	return (
		<section>
			<h2>Featured Products</h2>

			<ol>
				{p.products.map((product, idx) => {
					return <li key={product.id ?? idx}>{product.name}</li>;
				})}
			</ol>
		</section>
	);
}
