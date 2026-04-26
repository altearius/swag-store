import { Suspense } from 'react';

export default async function Page() {
	console.log('Rendering cache testing page', performance.now());

	return (
		<main>
			<h1>Cache Testing</h1>

			<p>This page uses a server action to load data.</p>

			<Suspense fallback={<p>Loading data from server action...</p>}>
				<ServerActionComponent />
			</Suspense>
		</main>
	);
}

async function ServerActionComponent() {
	const time = await getCurrentHRTime();
	console.log('Rendering server component', time);

	return <p>The process HR time is: {time.toString()}</p>;
}

async function getCurrentHRTime() {
	'use server';
	return process.hrtime();
}
