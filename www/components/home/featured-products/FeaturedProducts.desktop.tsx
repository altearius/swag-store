import type { Product as ProductModel } from '#api/products/listProducts';
import styles from './FeaturedProducts.module.css';
import Product from './product/Product';

interface Props {
	readonly products: readonly ProductModel[];
}

export default function FeaturedProductsDesktop(p: Props) {
	return (
		<section className={styles['featured-products']}>
			<h2>Featured Products</h2>

			<ol>
				{p.products.map((product, idx) => (
					<li key={product.id ?? idx}>
						<Product product={product} />
					</li>
				))}
			</ol>
		</section>
	);
}
