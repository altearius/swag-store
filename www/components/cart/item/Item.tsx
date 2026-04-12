import type { CartItem } from '#api/api.types';
import formatPrice from '#lib/formatPrice';
import Image from 'next/image';
import style from './Item.module.css';

interface Props {
	readonly item: CartItem;
}

export default function Item(p: Props) {
	const image = p.item.product?.images?.[0];

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
			<div>
				<h3>{p.item.product?.name}</h3>
				<p>
					{p.item.quantity} &times;{' '}
					{formatPrice(
						p.item.product?.price ?? 0,
						p.item.product?.currency ?? 'USD',
					)}{' '}
					={' '}
					{formatPrice(
						p.item.lineTotal ?? 0,
						p.item.product?.currency ?? 'USD',
					)}
				</p>
			</div>
		</div>
	);
}
