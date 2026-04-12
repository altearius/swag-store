import style from './AddToCart.module.css';

export default function AddToCartSkeleton() {
	return (
		<div className={style['add-to-cart']}>
			<p>
				In stock: <em>Loading...</em>
			</p>

			<p>
				<label>
					Quantity:{' '}
					<input
						name="quantity"
						defaultValue="1"
						disabled
						min="1"
						step="1"
						type="number"
					/>
				</label>
				<button type="submit" disabled>
					Add to cart
				</button>
			</p>
		</div>
	);
}
