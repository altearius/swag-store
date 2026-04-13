'use client';

import type { Categories } from '#api/api.types';
import { useCallback, useRef } from 'react';
import type { Handle } from '../categories/Modal';
import Modal from '../categories/Modal';
import style from './Controls.module.css';

interface Props {
	readonly categories: Promise<Categories>;
}

export default function Controls(p: Props) {
	const modalRef = useRef<Handle>(null);

	const onClickCategories = useCallback(() => {
		modalRef.current?.open();
	}, []);

	return (
		<section className={style['controls']}>
			<p className={style['input']}>
				<label>
					<input type="text" name="search" placeholder="🔎 Search" />
				</label>{' '}
				<button type="button" onClick={onClickCategories}>
					⚙️
				</button>{' '}
				<button type="submit">Go</button>
			</p>
			<Modal categories={p.categories} ref={modalRef} />{' '}
		</section>
	);
}
