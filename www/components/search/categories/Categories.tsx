import type { Categories as CategoryList } from '#api/api.types';
import { useSearchParams } from 'next/navigation';
import { Suspense, use } from 'react';
import style from './Categories.module.css';

interface Props {
	readonly categories: Promise<CategoryList>;
}

export default function Categories(p: Props) {
	return (
		<label className={style['categories']}>
			Category:
			<br />
			<Suspense fallback={<CategorySkeleton />}>
				<CategoryDropdown categories={p.categories} />
			</Suspense>
		</label>
	);
}

function CategorySkeleton() {
	return (
		<select disabled>
			<option>- loading -</option>
		</select>
	);
}

function CategoryDropdown(p: Props) {
	const categories = use(p.categories);
	const query = useSearchParams();
	const selected = query.get('category') ?? '';

	if (categories.size === 0) {
		return (
			<select disabled>
				<option>No categories found.</option>
			</select>
		);
	}

	const sorted = Array.from(categories).sort(([, a], [, b]) =>
		(a.name ?? '').localeCompare(b.name ?? ''),
	);

	return (
		<select name="category" defaultValue={selected}>
			<option value="">All categories</option>
			{sorted.map(([slug, { name }]) => (
				<option key={slug} value={slug}>
					{name}
				</option>
			))}
		</select>
	);
}
