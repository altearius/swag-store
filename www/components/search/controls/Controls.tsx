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

	const action = useCallback(
		(formData: FormData) => {
			const params = new URLSearchParams();
			const bind = bindString.bind(null, formData, params);
			bind('search');
			bind('category');

			// Changing search/category is intentionally decoupled from pagination.
			// The intent is that changing the search parameters should reset
			// pagination.

			router.push(`?${params.toString()}`);
		},
		[router],
	);

	const onTypeahead = useCallback(() => {
		formRef.current?.requestSubmit();
	}, []);

	return (
		<form
			className={style['controls']}
			role="search"
			ref={formRef}
			action={action}
		>
			<p>
				<Input onTypeahead={onTypeahead} />
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

function bindString(from: FormData, to: URLSearchParams, key: string) {
	const value = from.get(key);

	if (typeof value === 'string') {
		const parsed = value.trim();

		if (parsed) {
			to.set(key, parsed);
		}
	}
}
