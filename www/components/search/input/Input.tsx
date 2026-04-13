import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import style from './Input.module.css';

export default function Input() {
	return (
		<label className={style['input']}>
			Search:
			<br />
			<Suspense fallback={<input {...attr} />}>
				<SearchInput />
			</Suspense>
		</label>
	);
}

const attr = { name: 'search', type: 'text' } as const;

function SearchInput() {
	const query = useSearchParams();
	const value = query.get('search') ?? '';
	return <input {...attr} defaultValue={value} />;
}
