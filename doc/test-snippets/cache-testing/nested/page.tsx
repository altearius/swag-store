import { cacheLife } from 'next/cache';
import { Suspense } from 'react';

export default async function Page() {
	'use cache';
	cacheLife('minutes');

	console.log(
		'Rendering route with nested components',
		new Date().toISOString(),
	);

	return (
		<main>
			<h1>Cache Testing</h1>

			<p>This page defines a cache lifetime of minutes.</p>

			<Suspense fallback={<p>Loading nested component...</p>}>
				<NestedComponent />
			</Suspense>
		</main>
	);
}

async function NestedComponent() {
	'use cache';
	cacheLife('minutes');

	console.log('Rendering nested component', new Date().toISOString());

	return (
		<p>
			This is a nested component with a shorter cache lifetime than the static
			shell.
		</p>
	);
}
