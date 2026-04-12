import { use } from 'react';
import type { Props } from './AddToCart.props';

export default function AddToCartContent(p: Props) {
	const stock = use(p.stock);

	const available = stock?.stock ?? 0;

	return (
		<form>
			<p>
				In stock: {available.toLocaleString()}
				{available > 0 && stock?.lowStock === true ? ' (Act now!)' : ''}
			</p>

			<p>
				<label>
					Quantity:
					<input
						type="number"
						name="quantity"
						min="1"
						defaultValue="1"
						step="1"
						{...(available === 0 ? { disabled: true } : { max: available })}
					/>
				</label>
			</p>

			<p>
				<button type="submit" disabled={available === 0}>
					Add to Cart
				</button>
			</p>
		</form>
	);
}
