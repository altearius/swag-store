import type { Product as ProductModel } from '#api/api.types';
import formatPrice from '#lib/formatPrice';
import routeProduct from '#lib/routeProduct';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Product.module.css';

interface Props {
	readonly product: ProductModel;
}

export default function Product(p: Props) {
	const { currency, images: [imageSrc] = [], name, price } = p.product;
	const hasPrice = typeof price === 'number';
	const href = routeProduct(p.product) ?? '/search';

	return (
		<Link className={styles['product']} href={href}>
			{imageSrc ? (
				<div className={styles['image']}>
					<Image
						alt={p.product.name ?? ''}
						fill
						sizes="(width >= 40rem) 20rem, calc(100vw - 2rem)"
						src={imageSrc}
						style={{ objectFit: 'contain' }}
					/>
				</div>
			) : null}

			{name || hasPrice ? (
				<div className={styles['detail']}>
					{name ? <h3>{p.product.name}</h3> : null}
					{hasPrice ? <p>{formatPrice(price, currency)}</p> : null}
				</div>
			) : null}
		</Link>
	);
}
