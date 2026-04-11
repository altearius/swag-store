'use client';

import type { Product as ProductModel } from '#api/products/listProducts';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './FeaturedProducts.module.css';
import Product from './product/Product';

interface Props {
	readonly products: readonly ProductModel[];
}

export default function FeaturedProductsView(p: Props) {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

	if (p.products.length === 0) {
		return null;
	}

	return (
		<section className={styles['featured-products']}>
			<h2>Featured Products</h2>

			<div ref={emblaRef}>
				<ol>
					{p.products.map((product, idx) => (
						<li key={product.id ?? idx}>
							<Product product={product} />
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
