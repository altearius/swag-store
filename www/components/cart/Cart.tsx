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
			<h2>Cart Contents</h2>
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
