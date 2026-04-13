import type { Product } from '#api/api.types';
import formatPrice from '#lib/formatPrice';
import routeProduct from '#lib/routeProduct';
import Image from 'next/image';
import Link from 'next/link';
import style from './Result.module.css';

interface Props {
	readonly result: Product;
}

export default function Result(p: Props) {
	const image = p.result.images?.[0];
	const { currency = 'USD', price } = p.result;
	const route = routeProduct(p.result) ?? '/search';

	return (
		<Link className={style['result']} href={route}>
			<div>
				{image ? (
					<Image
						alt={p.result.name ?? ''}
						fill
						src={image}
						sizes="100px"
						style={{ objectFit: 'contain' }}
					/>
				) : null}
			</div>

			<div>
				<h2>{p.result.name}</h2>

				{typeof price === 'number' ? (
					<p>{formatPrice(price, currency)}</p>
				) : null}

				<p>{p.result.description}</p>
			</div>
		</Link>
	);
}
