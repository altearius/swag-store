'use client';

import type { Product } from '#api/api.types';
import useCart from '#cart/useCart';
import parseQuantity from '#lib/parseQuantity';
import useStock from '#lib/useStock';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import style from './AddToCart.module.css';

interface Props {
	readonly className?: string | undefined;
	readonly product: Product;
}

export default function AddToCart(p: Props) {
	const { id: productId } = p.product;
	const { loading, stock } = useStock(productId);
	const { addToCart } = useCart();
	const router = useRouter();
	const available = stock?.stock ?? 0;

	const disabled = loading || available < 1 || typeof productId !== 'string';

	const action = useCallback(
		async (formData: FormData) => {
			if (!productId) {
				throw new Error('Product ID is required to add to cart');
			}

			router.prefetch('/cart');

			await addToCart(
				productId,
				Math.max(parseQuantity(formData.get('quantity') ?? '1'), 1),
			);

			router.push('/cart');
		},
		[addToCart, productId, router],
	);

	return (
		<form action={action} className={clsx(style['add-to-cart'], p.className)}>
			<p>
				In stock: {loading ? <em>Loading...</em> : available.toLocaleString()}
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
						{...(disabled ? { disabled, max: 1 } : { max: available })}
					/>
				</label>
				<Submit disabled={disabled} />
			</p>
		</form>
	);
}

interface SubmitProps {
	readonly disabled: boolean;
}

function Submit(p: SubmitProps) {
	const { pending } = useFormStatus();
	const disabled = pending || p.disabled;

	return (
		<button type="submit" disabled={disabled}>
			{pending ? 'Adding...' : 'Add to Cart'}
		</button>
	);
}
