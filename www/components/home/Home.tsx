import { Suspense } from 'react';
import Banner from './banner/Banner';
import Hero from './hero/Hero';

export default function Home() {
	return (
		<main>
			<Suspense>
				<Banner />
			</Suspense>
			<Hero />
			<p>Featured Products</p>
		</main>
	);
}
