import type { Product } from '#api/api.types';
import { Suspense, use } from 'react';

interface Props {
	readonly results: Promise<readonly Product[]>;
}

export default function Results(p: Props) {
	return (
		<section>
			<Suspense fallback={<p>Loading results...</p>}>
				<ResultList results={p.results} />
			</Suspense>
		</section>
	);
}

function ResultList(p: Props) {
	const results = use(p.results);

	if (results.length === 0) {
		return <p>No results found.</p>;
	}

	return (
		<ul>
			{results.map((result, idx) => (
				<li key={result.id ?? idx}>
					<h2>{result.name}</h2>
					<p>{result.description}</p>
				</li>
			))}
		</ul>
	);
}
