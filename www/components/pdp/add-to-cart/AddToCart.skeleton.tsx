export default function AddToCartSkeleton() {
	return (
		<div>
			<p>
				In stock: <em>Loading...</em>
			</p>

			<p>
				<label>
					Quantity:
					<input
						name="quantity"
						defaultValue="1"
						disabled
						min="1"
						step="1"
						type="number"
					/>
				</label>
			</p>

			<p>
				<button type="submit" disabled>
					Add to cart
				</button>
			</p>
		</div>
	);
}
