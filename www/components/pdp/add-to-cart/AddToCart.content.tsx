import { use, useCallback } from 'react';
import useCart from '../../../cart/useCart';
import type { Props } from './AddToCart.props';

export default function AddToCartContent(p: Props) {
	const stock = use(p.stock);
	const cart = useCart();
	const available = stock?.stock ?? 0;
	const { id: productId } = p.product;
	const disabled = available < 1 || typeof productId !== 'string';

	if (available > 0 && typeof productId !== 'string') {
		console.warn('Could not resolve product id');
	}

	const action = useCallback(
		async (formData: FormData) => {
			const rawQuantity = formData.get('quantity');

			if (!productId) {
				throw new Error('Product ID is required to add to cart');
			}

			const quantity =
				typeof rawQuantity === 'string' ? parseInt(rawQuantity, 10) : 1;

			await cart.addToCart(productId, quantity);
		},
		[cart, productId],
	);

	return (
		<form action={action}>
			<p>
				In stock: {available.toLocaleString()}
				{!disabled && stock?.lowStock === true ? ' (Act now!)' : ''}
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
						{...(disabled ? { disabled } : { max: available })}
					/>
				</label>
			</p>

			<p>
				<button type="submit" disabled={disabled}>
					Add to Cart
				</button>
			</p>
		</form>
	);
}
