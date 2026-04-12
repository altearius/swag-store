import { Suspense } from 'react';
import AddToCartContent from './AddToCart.content';
import type { Props } from './AddToCart.props';
import AddToCartSkeleton from './AddToCart.skeleton';

export default function AddToCart(p: Props) {
	return (
		<div>
			<Suspense fallback={<AddToCartSkeleton />}>
				<AddToCartContent {...p} />
			</Suspense>
		</div>
	);
}
