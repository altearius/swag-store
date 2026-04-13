'use client';

import type { Categories as CategoryList } from '#api/api.types';
import { useRef } from 'react';
import Categories from '../categories/Categories';
import style from './Controls.module.css';

interface Props {
	readonly categories: Promise<CategoryList>;
}

export default function Controls(p: Props) {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form className={style['controls']} role="search" ref={formRef}>
			<p>
				<label>
					<input type="text" name="search" placeholder="🔎 Search" />
				</label>{' '}
				<Categories categories={p.categories} />
				<button type="submit">Go</button>{' '}
			</p>
		</form>
	);
}
