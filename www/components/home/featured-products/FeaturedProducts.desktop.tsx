import clsx from 'clsx';
import styles from './FeaturedProducts.module.css';
import type { Props } from './FeaturedProducts.types';
import Product from './product/Product';

export default function FeaturedProductsDesktop(p: Props) {
	return (
		<section className={clsx(styles['featured-products'], 'layout-max-width')}>
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
