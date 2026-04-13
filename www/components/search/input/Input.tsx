'use client';

import { useCallback } from 'react';
import style from './Input.module.css';

interface Props {
	readonly onOpenCategories: () => void;
}

export default function Input(p: Props) {
	const onClickCategories = useCallback(() => p.onOpenCategories(), [p]);

	return (
		<p className={style['input']}>
			<label>
				<input type="text" name="search" placeholder="🔎 Search" />
			</label>{' '}
			<button type="button" onClick={onClickCategories}>
				⚙️
			</button>{' '}
			<button type="submit">Go</button>
		</p>
	);
}
