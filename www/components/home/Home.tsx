import { Suspense } from 'react';
import Banner from './banner/Banner';

export default function Home() {
	return (
		<main>
			<Suspense>
				<Banner />
			</Suspense>
			<p>Hero</p>
			<p>Featured Products</p>
		</main>
	);
}
