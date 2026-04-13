'use client';

import style from './Cart.module.css';
import Contents from './contents/Contents';
import Empty from './empty/Empty';
import Total from './total/Total';

export default function CartPage() {
	return (
		<main className={style['cart-page']}>
			<h2>Cart Contents</h2>
			<Empty />
			<Contents />
			<Total />
		</main>
	);
}
