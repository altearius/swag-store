'use client';

import useCart from '#cart/useCart';
import clsx from 'clsx';
import Link from 'next/link';
import style from './Cart.module.css';

interface Props {
	readonly className?: string | undefined;
}

export default function Cart(p: Props) {
	const { contents } = useCart();
	const itemCount = contents?.totalItems ?? 0;

	return (
		<Link href="/cart" className={clsx(style['cart'], p.className)}>
			🛒 {itemCount.toLocaleString()}
		</Link>
	);
}
