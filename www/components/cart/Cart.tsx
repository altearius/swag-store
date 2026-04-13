'use client';

import clsx from 'clsx';
import Link from 'next/link';
import style from './Cart.module.css';
import Contents from './contents/Contents';
import Empty from './empty/Empty';
import Total from './total/Total';

export default function CartPage() {
	return (
		<main className={clsx(style['cart-page'], 'layout-max-width')}>
			<h1>Cart Contents</h1>
			<Empty />
			<Contents />
			<Total />
			<p>
				<Link href="/search" className="button">
					Continue Shopping
				</Link>
			</p>
		</main>
	);
}
