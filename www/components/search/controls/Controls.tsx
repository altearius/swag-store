'use client';

import type { Categories as CategoryList } from '#api/api.types';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';
import Categories from '../categories/Categories';
import Input from '../input/Input';
import style from './Controls.module.css';

interface Props {
	readonly categories: Promise<CategoryList>;
}

export default function Controls(p: Props) {
	const formRef = useRef<HTMLFormElement>(null);
	const router = useRouter();

	const action = useCallback((formData: FormData) => {
		const search = formData.get('search');
		const category = formData.get('category');
		const params = new URLSearchParams();

		if (typeof search === 'string') {
			const parsed = search.trim();

			if (parsed) {
				params.set('search', parsed);
			}
		}

		if (typeof category === 'string') {
			const parsed = category.trim();

			if (parsed) {
				params.set('category', parsed);
			}
		}

		router.push(`?${params.toString()}`);
	}, []);

	return (
		<form
			className={style['controls']}
			role="search"
			ref={formRef}
			action={action}
		>
			<p>
				<Input />
			</p>

			<p>
				<Categories categories={p.categories} />
			</p>

			<p>
				<button type="submit">Search</button>
			</p>
		</form>
	);
}
