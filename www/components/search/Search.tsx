import type { Categories } from '#api/api.types';
import clsx from 'clsx';
import { Suspense } from 'react';
import style from './Search.module.css';
import Controls from './controls/Controls';
import LoadingProvider from './loading-context/LoadingContext';
import Pagination from './pagination/Pagination';
import Results from './results/Results';

interface Props {
	readonly categories: Promise<Categories>;
	readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default function Search(p: Props) {
	return (
		<main className={clsx(style['search'], 'layout-max-width')}>
			<h1>Products</h1>

			<LoadingProvider>
				<Controls categories={p.categories} />
				<Pagination searchParams={p.searchParams} />

				<section className={style['results']}>
					<Suspense fallback={<p>Loading results...</p>}>
						<Results {...p} />
					</Suspense>
				</section>
			</LoadingProvider>
		</main>
	);
}
