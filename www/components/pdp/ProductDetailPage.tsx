import type getProductDetail from '#api/products/getProductDetail';
import formatPrice from '#lib/formatPrice';
import Image from 'next/image';
import style from './ProductDetailPage.module.css';

type Product = NonNullable<Awaited<ReturnType<typeof getProductDetail>>>;

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
		<main className={style['product-detail-page']}>
			{name ? <h1>{name}</h1> : null}

			{image ? (
				<div className={style['image']}>
					<Image
						src={image}
						alt={name ?? 'Product image'}
						fill
						style={{ objectFit: 'contain' }}
					/>
				</div>
			) : null}

			{description || hasPrice ? (
				<div className={style['detail']}>
					{description ? <p>{description}</p> : null}
					{hasPrice ? <p>{formatPrice(price, currency)}</p> : null}
				</div>
			) : null}
		</main>
	);
}
