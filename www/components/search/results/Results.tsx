import { Suspense } from 'react';
import search from '../lib/search';
import Result from '../result/Result';
import style from './Results.module.css';

interface Props {
	readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default function Results(p: Props) {
	return (
		<section className={style['results']}>
			<Suspense fallback={<p>Loading results...</p>}>
				<ResultList {...p} />
			</Suspense>
		</section>
	);
}

async function ResultList(p: Props) {
	const results = (await search(p.searchParams))?.data ?? [];

	if (results.length === 0) {
		return <p>No results found.</p>;
	}

	return (
		<ul>
			{results.map((result, idx) => (
				<li key={result.id ?? idx}>
					<Result result={result} />
				</li>
			))}
		</ul>
	);
}
