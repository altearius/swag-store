import type { Categories } from '#api/api.types';
import type { Ref } from 'react';
import { Suspense, useImperativeHandle, useRef } from 'react';
import { List } from './List';
import style from './Modal.module.css';

export interface Handle {
	open: () => void;
}

interface Props {
	readonly categories: Promise<Categories>;
	readonly ref?: Ref<Handle>;
}

export default function Modal(p: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(p.ref, () => ({
		open() {
			dialogRef.current?.showModal();
		},
	}));

	return (
		<dialog closedby="any" ref={dialogRef} className={style['modal']}>
			<h2>Category</h2>

			<Suspense fallback={<p>Loading categories...</p>}>
				<List categories={p.categories} />
			</Suspense>
		</dialog>
	);
}
