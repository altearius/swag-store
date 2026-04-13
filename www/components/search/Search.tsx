'use client';

import type { Categories } from '#api/api.types';
import clsx from 'clsx';
import { useRef } from 'react';
import style from './Search.module.css';
import type { Handle } from './categories/Modal';
import Modal from './categories/Modal';
import Input from './input/Input';

interface Props {
	readonly categories: Promise<Categories>;
}

export default function Search(p: Props) {
	const modalRef = useRef<Handle>(null);

	const onOpenCategories = () => {
		modalRef.current?.open();
	};

	return (
		<main className={clsx(style['search'], 'layout-max-width')}>
			<h1>Products</h1>

			<form>
				<Input onOpenCategories={onOpenCategories} />
			</form>

			<Modal categories={p.categories} ref={modalRef} />
		</main>
	);
}
