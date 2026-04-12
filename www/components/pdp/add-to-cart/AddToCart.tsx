import type { Stock as StockModel } from '#api/stock/getStock';
import { Suspense, use } from 'react';

interface Props {
	readonly stock: Promise<StockModel | null>;
}

export default function AddToCart(p: Props) {
	return (
		<div>
			<Suspense fallback={<p>Checking stock...</p>}>
				<AddToCartContent stock={p.stock} />
			</Suspense>
		</div>
	);
}

function AddToCartContent(p: Props) {
	const stock = use(p.stock);

	if (!stock) {
		return <p>Stock information is not available.</p>;
	}

	const available = stock.stock ?? 0;

	if (available < 1) {
		return <p>Out of stock</p>;
	}

	return (
		<form>
			<p>
				In stock: {stock.stock?.toLocaleString()}
				{stock.lowStock ? ' (Act now!)' : ''}
			</p>

			<p>
				<label>
					Quantity:
					<input
						type="number"
						name="quantity"
						min="1"
						defaultValue="1"
						step="1"
						max={available}
					/>
				</label>
			</p>

			<p>
				<button type="submit">Add to cart</button>
			</p>
		</form>
	);
}
