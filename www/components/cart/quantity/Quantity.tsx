import type { CartItem } from '#api/api.types';
import formatPrice from '#lib/formatPrice';
import parseQuantity from '#lib/parseQuantity';
import type { ChangeEvent } from 'react';
import { useCallback, useId, useState } from 'react';
import style from './Quantity.module.css';

interface Props {
	readonly item: CartItem;
}

export default function Quantity(p: Props) {
	const id = useId();
	const [quantity, setQuantity] = useState(p.item.quantity ?? 0);
	const currency = p.item.product?.currency ?? 'USD';

	const lineTotal =
		quantity === p.item.quantity
			? (p.item.lineTotal ?? 0)
			: (p.item.product?.price ?? 0) * quantity;

	const onChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setQuantity(Math.max(parseQuantity(e.target.value), 0));
	}, []);

	return (
		<p className={style['quantity']}>
			<label>
				Update Quantity:
				<br />
				<input
					type="number"
					id={id}
					name="quantity"
					onChange={onChangeQuantity}
					value={quantity}
					min={0}
					step={1}
				/>
			</label>{' '}
			&times; {formatPrice(p.item.product?.price ?? 0, currency)} ={' '}
			<output htmlFor={id}>{formatPrice(lineTotal, currency)}</output>
		</p>
	);
}
