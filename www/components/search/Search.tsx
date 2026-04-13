'use client';

import type { Categories, Product } from '#api/api.types';
import clsx from 'clsx';
import style from './Search.module.css';
import Controls from './controls/Controls';
import Results from './results/Results';

interface Props {
	readonly categories: Promise<Categories>;
	readonly results: Promise<readonly Product[]>;
}

export default function Search(p: Props) {
	return (
		<main className={clsx(style['search'], 'layout-max-width')}>
			<h1>Products</h1>

			<Controls categories={p.categories} />
			<Results results={p.results} />
		</main>
	);
}
