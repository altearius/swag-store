import type { Categories } from '#api/api.types';
import { use } from 'react';
import style from './List.module.css';

interface Props {
	readonly categories: Promise<Categories>;
}

export function List(p: Props) {
	const categories = use(p.categories);

	const sorted = Array.from(categories).sort(([, a], [, b]) =>
		(a.name ?? '').localeCompare(b.name ?? ''),
	);

	return (
		<ul className={style['list']}>
			{sorted.map(([slug, { name }]) => (
				<li key={slug}>{name}</li>
			))}
		</ul>
	);
}
