import type { Product as ProductModel } from '#api/products/listProducts';
import Product from './product/Product';

interface Props {
	readonly products: readonly ProductModel[];
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
					return (
						<li key={product.id ?? idx}>
							<Product product={product} />
						</li>
					);
				})}
			</ol>
		</section>
	);
}
