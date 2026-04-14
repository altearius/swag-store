import type { CartItem } from '#api/api.types';
import useCart from '#cart/useCart';
import parseQuantity from '#lib/parseQuantity';
import routeProduct from '#lib/routeProduct';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { useFormStatus } from 'react-dom';
import Quantity from '../quantity/Quantity';
import style from './Item.module.css';

interface Props {
	readonly item: CartItem;
}

export default function Item(p: Props) {
	const { updateQuantity } = useCart();
	const image = p.item.product?.images?.[0];
	const productId = p.item.productId ?? p.item.product?.id;
	const name = p.item.product?.name ?? 'Unknown Product';
	const route = routeProduct(p.item.product) ?? '/search';

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
			<Link href={route}>
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
					<Link href={route}>{name}</Link>
				</h3>
				<p></p>
				<Quantity item={p.item} />
				<p>
					<Submit />
				</p>
			</form>
		</div>
	);
}

function Submit() {
	const { pending } = useFormStatus();

	return (
		<>
			<button name="actionType" type="submit" value="save" disabled={pending}>
				Save
			</button>

			<button name="actionType" type="submit" value="remove" disabled={pending}>
				Remove
			</button>
		</>
	);
}
