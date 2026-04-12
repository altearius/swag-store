import type { Stock as StockModel } from '#api/stock/getStock';
import { Suspense, use } from 'react';
import style from './Stock.module.css';

interface Props {
	readonly stock: Promise<StockModel | null>;
}

export default function Stock(p: Props) {
	return (
		<div className={style['stock']}>
			<Suspense fallback={<p>Checking stock...</p>}>
				<StockContent stock={p.stock} />
			</Suspense>
		</div>
	);
}

function StockContent(p: Props) {
	const stock = use(p.stock);

	if (!stock) {
		return <p>Stock information is not available.</p>;
	}

	const available = (stock.stock ?? 0) > 0;

	if (available) {
		return (
			<p>
				In stock: {stock.stock?.toLocaleString()}
				{stock.lowStock ? ' (Act now!)' : ''}
			</p>
		);
	}

	return <p>Out of stock</p>;
}
