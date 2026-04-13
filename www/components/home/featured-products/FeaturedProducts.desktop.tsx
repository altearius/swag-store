import type { Product as ProductModel } from '#api/api.types';
import styles from './FeaturedProducts.module.css';
import Product from './product/Product';

interface Props {
	readonly products: readonly ProductModel[];
}

export default function FeaturedProductsDesktop(p: Props) {
	return (
		<section className={styles['featured-products']}>
			<h2 className="layout-max-width">Featured Products</h2>

			<ol className="layout-max-width">
				{p.products.map((product, idx) => (
					<li key={product.id ?? idx}>
						<Product product={product} />
					</li>
				))}
			</ol>
		</section>
	);
}
