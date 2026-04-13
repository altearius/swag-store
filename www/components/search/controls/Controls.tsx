'use client';

import type { Categories as CategoryList } from '#api/api.types';
import { useRef } from 'react';
import Categories from '../categories/Categories';
import Input from '../input/Input';
import style from './Controls.module.css';

interface Props {
	readonly categories: Promise<CategoryList>;
}

export default function Controls(p: Props) {
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form className={style['controls']} role="search" ref={formRef}>
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
