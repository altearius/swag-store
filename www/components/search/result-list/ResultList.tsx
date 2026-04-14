'use client';

import type { Product } from '#api/api.types';
import clsx from 'clsx';
import { useContext } from 'react';
import { LoadingContext } from '../loading-context/LoadingContext';
import Result from '../result/Result';
import style from './ResultList.module.css';

interface Props {
	readonly results: readonly Product[];
}

export default function ResultList(p: Props) {
	const { isPending } = useContext(LoadingContext);

	return (
		<div className={clsx(style['result-list'], isPending && style['pending'])}>
			{p.results.length === 0 ? (
				<p>No results found.</p>
			) : (
				<ul>
					{' '}
					{p.results.map((result, idx) => (
						<li key={result.id ?? idx}>
							<Result result={result} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
