import { Suspense } from 'react';
import Result from '../result/Result';
import style from './Results.module.css';
import bindCategory from './lib/bindCategory';
import bindValue from './lib/bindValue';
import search from './lib/search';

interface Props {
	readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Results(p: Props) {
	return (
		<section className={style['results']}>
			<Suspense fallback={<p>Loading results...</p>}>
				<ResultList {...p} />
			</Suspense>
		</section>
	);
}

async function ResultList(p: Props) {
	const query = await p.searchParams;
	const results = await search(bindCategory(query), bindValue(query['search']));

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
