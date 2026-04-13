import debounce from 'debounce';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { Suspense, useCallback, useMemo } from 'react';
import style from './Input.module.css';

interface Props {
	readonly onTypeahead: (value: string) => void;
}

export default function Input(p: Props) {
	return (
		<label className={style['input']}>
			Search:
			<br />
			<Suspense fallback={<input {...attr} disabled />}>
				<SearchInput {...p} />
			</Suspense>
		</label>
	);
}

const attr = { name: 'search', type: 'text' } as const;

function SearchInput(p: Props) {
	const query = useSearchParams();
	const value = query.get('search') ?? '';

	const debounced = useMemo(
		() => debounce(p.onTypeahead, 300),
		[p.onTypeahead],
	);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value.trim();

			if (value.length >= 3 || value.length === 0) {
				debounced(value);
			}
		},
		[debounced],
	);

	return <input {...attr} defaultValue={value} onChange={handleChange} />;
}
