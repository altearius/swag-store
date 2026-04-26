import { cacheLife } from 'next/cache';

export default async function Page() {
	'use cache';
	cacheLife('minutes');

	console.log('Rendering cache testing page', new Date().toISOString());

	return (
		<main>
			<h1>Cache Testing</h1>

			<p>This page defines a cache lifetime of minutes.</p>
		</main>
	);
}
