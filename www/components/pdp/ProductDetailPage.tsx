import type { Product, Stock } from '#api/api.types';
import formatPrice from '#lib/formatPrice';
import clsx from 'clsx';
import Image from 'next/image';
import style from './ProductDetailPage.module.css';
import AddToCart from './add-to-cart/AddToCart';

interface Props {
	readonly product: Product;
	readonly stock: Promise<Stock | null>;
}

export default function ProductDetailPage(p: Props) {
	const {
		currency,
		description,
		images: [image] = [],
		name,
		price,
	} = p.product;

	const hasPrice = typeof price === 'number';

	return (
		<main className={clsx(style['product-detail-page'], 'layout-max-width')}>
			{name ? <h1>{name}</h1> : null}

			{image ? (
				<div className={style['image']}>
					<Image
						src={image}
						alt={name ?? 'Product image'}
						fill
						style={{ objectFit: 'contain' }}
						loading="eager"
					/>
				</div>
			) : null}

			{description || hasPrice ? (
				<div className={style['detail']}>
					{description ? <p>{description}</p> : null}
					{hasPrice ? <p>{formatPrice(price, currency)}</p> : null}
				</div>
			) : null}

			<AddToCart product={p.product} stock={p.stock} />
		</main>
	);
}
