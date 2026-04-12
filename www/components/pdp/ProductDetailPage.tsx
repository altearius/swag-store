import type { Product } from '#api/products/getProductDetail';
import type { Stock as StockModel } from '#api/stock/getStock';
import formatPrice from '#lib/formatPrice';
import Image from 'next/image';
import style from './ProductDetailPage.module.css';
import AddToCart from './add-to-cart/AddToCart';

interface Props {
	readonly product: Product;
	readonly stock: Promise<StockModel | null>;
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

			<AddToCart stock={p.stock} />
		</main>
	);
}
