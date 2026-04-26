import clsx from 'clsx';
import { use } from 'react';
import styles from './FeaturedProducts.module.css';
import type { Props } from './FeaturedProducts.types';
import Product from './product/Product';

export default function FeaturedProductsDesktop(p: Props) {
	const products = use(p.products);

	return (
		<section className={clsx(styles['featured-products'], 'layout-max-width')}>
			<h2>Featured Products</h2>

			<ol>
				{products.map((product, idx) => (
					<li key={product.id ?? idx}>
						<Product product={product} />
					</li>
				))}
			</ol>
		</section>
	);
}
