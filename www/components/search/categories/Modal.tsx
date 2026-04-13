import { Suspense, useImperativeHandle, useRef } from 'react';
import { List } from './List';
import type { Props as BaseProps } from './Props';

export interface Handle {
	open: () => void;
}

interface Props extends BaseProps {
	readonly ref?: React.Ref<Handle>;
}

export default function Modal(p: Props) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useImperativeHandle(p.ref, () => ({
		open() {
			dialogRef.current?.showModal();
		},
	}));

	return (
		<dialog closedby="any" ref={dialogRef}>
			<p>Category modal</p>

			<Suspense fallback={<p>Loading categories...</p>}>
				<List categories={p.categories} />
			</Suspense>
		</dialog>
	);
}
