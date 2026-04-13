import type { Categories as CategoryList } from '#api/api.types';
import { Suspense, use } from 'react';

interface Props {
	readonly categories: Promise<CategoryList>;
}

export default function Categories(p: Props) {
	return (
		<Suspense fallback={<CategorySkeleton />}>
			<CategoryDropdown categories={p.categories} />
		</Suspense>
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
		<select name="category">
			<option value="">All categories</option>
			{sorted.map(([slug, { name }]) => (
				<option key={slug} value={slug}>
					{name}
				</option>
			))}
		</select>
	);
}
