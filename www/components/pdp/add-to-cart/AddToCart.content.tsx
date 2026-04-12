'use client';

import { use, useCallback } from 'react';
import useCart from '../../../cart/useCart';
import style from './AddToCart.module.css';
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

			if (Number.isNaN(quantity) || quantity < 1) {
				throw new Error('Quantity must be a positive integer');
			}

			await cart.addToCart(productId, quantity);
		},
		[cart, productId],
	);

	return (
		<form action={action} className={style['add-to-cart']}>
			<p>
				In stock: {available.toLocaleString()}
				{!disabled && stock?.lowStock === true ? ' (Act now!)' : ''}
			</p>

			<p>
				<label>
					Quantity:{' '}
					<input
						type="number"
						name="quantity"
						min="1"
						defaultValue="1"
						required
						step="1"
						{...(disabled ? { disabled } : { max: available })}
					/>
				</label>
				<button type="submit" disabled={disabled}>
					Add to Cart
				</button>
			</p>
		</form>
	);
}
