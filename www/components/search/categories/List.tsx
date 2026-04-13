import { use } from 'react';
import type { Props } from './Props';

export function List(p: Props) {
	const categories = use(p.categories);

	const sorted = Array.from(categories).sort(([, a], [, b]) =>
		(a.name ?? '').localeCompare(b.name ?? ''),
	);

	return (
		<ul>
			{sorted.map(([slug, { name }]) => (
				<li key={slug}>{name}</li>
			))}
		</ul>
	);
}
