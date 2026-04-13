import type { CartItem } from '#api/api.types';
import useCart from '#cart/useCart';
import formatPrice from '#lib/formatPrice';
import parseQuantity from '#lib/parseQuantity';
import Image from 'next/image';
import { useCallback } from 'react';
import style from './Item.module.css';

interface Props {
	readonly item: CartItem;
}

export default function Item(p: Props) {
	const { updateQuantity } = useCart();
	const image = p.item.product?.images?.[0];
	const currency = p.item.product?.currency ?? 'USD';
	const productId = p.item.productId ?? p.item.product?.id;

	const action = useCallback(
		async (formData: FormData) => {
			if (!productId) {
				throw new Error('Product ID is required to add to cart');
			}

			const actionType = formData.get('actionType');

			const quantity =
				actionType === 'remove'
					? 0
					: parseQuantity(formData.get('quantity') ?? '0');

			await updateQuantity(productId, quantity);
		},
		[updateQuantity, productId],
	);

	return (
		<div className={style['item']}>
			<div>
				{image ? (
					<Image
						alt={p.item.product.name ?? ''}
						fill
						src={image}
						sizes="100px"
						style={{ objectFit: 'contain' }}
					/>
				) : null}
			</div>
			<form action={action}>
				<h3>{p.item.product?.name}</h3>
				<p>
					<label>
						Update Quantity:{' '}
						<input
							type="number"
							name="quantity"
							defaultValue={p.item.quantity}
							min={0}
							step={1}
						/>
					</label>
					<button name="actionType" type="submit" value="save">
						Save
					</button>
					<button name="actionType" type="submit" value="remove">
						Remove
					</button>
				</p>
				<p>
					{(p.item.quantity ?? 0).toLocaleString()}
					&times; {formatPrice(p.item.product?.price ?? 0, currency)} ={' '}
					{formatPrice(p.item.lineTotal ?? 0, currency)}
				</p>
			</form>
		</div>
	);
}
