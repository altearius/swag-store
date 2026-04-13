import type { Product } from '#api/api.types';
import formatPrice from '#lib/formatPrice';
import clsx from 'clsx';
import Image from 'next/image';
import style from './ProductDetailPage.module.css';
import AddToCart from './add-to-cart/AddToCart';
import Meta from './meta/Meta';

interface Props {
	readonly product: Product;
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
		<>
			<main className={clsx(style['product-detail-page'], 'layout-max-width')}>
				{name ? <h1>{name}</h1> : null}

				{image ? (
					<div className={style['image']}>
						<Image
							src={image}
							alt={name ?? 'Product image'}
							fill
							style={{ objectFit: 'contain' }}
							sizes="(width >= 40rem) 20rem, 100%"
							loading="eager"
						/>
					</div>
				) : null}

				{description ? (
					<p className={style['description']}>{description}</p>
				) : null}

				{hasPrice ? (
					<p className={style['price']}>{formatPrice(price, currency)}</p>
				) : null}

				<AddToCart {...p} className={style['add-to-cart']} />
			</main>
			<Meta {...p} />
		</>
	);
}
