'use server';

import createClient from '../createClient';
import transformCart from './lib/transformCart';

export default async function updateQuantity(
	cartToken: string,
	productId: string,
	quantity: number,
) {
	const client = createClient();

	const result = await client.PATCH('/cart/{itemId}', {
		body: { quantity },
		params: {
			header: { 'x-cart-token': cartToken },
			path: { itemId: productId },
		},
	});

	return transformCart(result.data);
}
