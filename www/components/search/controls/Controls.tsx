'use client';

import type { Categories } from '#api/api.types';
import { Suspense, use, useRef } from 'react';
import style from './Controls.module.css';

interface Props {
	readonly categories: Promise<Categories>;
}

export default function Controls(p: Props) {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form className={style['controls']} role="search" ref={formRef}>
			<p>
				<label>
					<input type="text" name="search" placeholder="🔎 Search" />
				</label>{' '}
				<Suspense fallback={<CategorySkeleton />}>
					<CategoryDropdown categories={p.categories} />
				</Suspense>{' '}
				<button type="submit">Go</button>{' '}
			</p>
		</form>
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
