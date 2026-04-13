'use client';

import type { Categories } from '#api/api.types';
import type { ChangeEventHandler } from 'react';
import { useCallback, useRef, useState } from 'react';
import type { Handle } from '../categories/Modal';
import Modal from '../categories/Modal';
import style from './Controls.module.css';

interface Props {
	readonly categories: Promise<Categories>;
}

export default function Controls(p: Props) {
	const [categoryCount, setCategoryCount] = useState(0);
	const modalRef = useRef<Handle>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const noun = categoryCount === 1 ? 'category' : 'categories';

	const onClickCategories = useCallback(() => {
		modalRef.current?.open();
	}, []);

	const onChange = useCallback<ChangeEventHandler>(() => {
		const form = formRef.current;
		setCategoryCount(form ? new FormData(form).getAll('categories').length : 0);
	}, []);

	return (
		<form
			className={style['controls']}
			role="search"
			onChange={onChange}
			ref={formRef}
		>
			<p>
				<label>
					<input type="text" name="search" placeholder="🔎 Search" />
				</label>{' '}
				<button type="submit">Go</button>{' '}
			</p>
			<p>
				<button type="button" onClick={onClickCategories}>
					⚙️ {categoryCount.toLocaleString()} {noun} selected
				</button>{' '}
			</p>
			<Modal categories={p.categories} ref={modalRef} />{' '}
		</form>
	);
}
