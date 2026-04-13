'use client';

import type { Categories } from '#api/api.types';
import clsx from 'clsx';
import style from './Search.module.css';
import Controls from './controls/Controls';

interface Props {
	readonly categories: Promise<Categories>;
}

export default function Search(p: Props) {
	return (
		<main className={clsx(style['search'], 'layout-max-width')}>
			<h1>Products</h1>

			<Controls categories={p.categories} />
		</main>
	);
}
