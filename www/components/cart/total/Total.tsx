import useCart from '../../../cart/useCart';
import formatPrice from '../../../lib/formatPrice';
import style from './Total.module.css';

export default function Total() {
	const { contents } = useCart();

	if (!contents) {
		return null;
	}

	const { currency = 'USD', totalItems = 0, subtotal = 0 } = contents;

	return (
		<table className={style['total']}>
			<tbody>
				<tr>
					<th>Total Items:</th>
					<td>{totalItems.toLocaleString()}</td>
				</tr>
				<tr>
					<th>Total:</th>
					<td>{formatPrice(subtotal, currency)}</td>
				</tr>
			</tbody>
		</table>
	);
}
