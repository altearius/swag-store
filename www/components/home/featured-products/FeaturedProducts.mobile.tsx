'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { use } from 'react';
import styles from './FeaturedProducts.module.css';
import type { Props } from './FeaturedProducts.types';
import Product from './product/Product';

export default function FeaturedProductsMobile(p: Props) {
	const products = use(p.products);

	const [emblaRef] = useEmblaCarousel({ loop: true }, [
		Autoplay({ delay: 8000 }),
	]);

	return (
		<section className={styles['featured-products']}>
			<h2 className="layout-max-width">Featured Products</h2>

			<div ref={emblaRef}>
				<ol>
					{products.map((product, idx) => (
						<li key={product.id ?? idx}>
							<Product product={product} />
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
