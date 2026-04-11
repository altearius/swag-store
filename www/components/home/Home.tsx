import { Suspense } from 'react';
import Banner from './banner/Banner';
import FeaturedProducts from './featured-products/FeaturedProducts';
import Hero from './hero/Hero';

export default function Home() {
	return (
		<main>
			<Suspense>
				<Banner />
			</Suspense>
			<Hero />
			<FeaturedProducts />
		</main>
	);
}
