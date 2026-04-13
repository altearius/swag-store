import type { CartItem } from '#api/api.types';
import useCart from '#cart/useCart';
import formatPrice from '#lib/formatPrice';
import parseQuantity from '#lib/parseQuantity';
import Image from 'next/image';
import Link from 'next/link';
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
	const name = p.item.product?.name ?? 'Unknown Product';

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
			<Link href={`/products/${productId}`}>
				{image ? (
					<Image
						alt={name}
						fill
						src={image}
						sizes="100px"
						style={{ objectFit: 'contain' }}
					/>
				) : null}
			</Link>
			<form action={action}>
				<h3>
					<Link href={`/products/${productId}`}>{name}</Link>
				</h3>
				<p>
					{(p.item.quantity ?? 0).toLocaleString()}
					&times; {formatPrice(p.item.product?.price ?? 0, currency)} ={' '}
					{formatPrice(p.item.lineTotal ?? 0, currency)}
				</p>
				<p>
					<label>
						Update Quantity:
						<br />
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
			</form>
		</div>
	);
}
