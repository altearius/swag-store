'use server';

import createClient from '../createClient';
import transformCart from './lib/transformCart';

export default async function addToCart(
	cartToken: string | null,
	productId: string,
	quantity: number,
) {
	const client = createClient();

	const token = cartToken ?? (await createCart(client));

	const result = await client.POST('/cart', {
		body: { productId, quantity },
		params: { header: { 'x-cart-token': token } },
	});

	return transformCart(result.data);
}

async function createCart(client: ReturnType<typeof createClient>) {
	const result = await client.POST('/cart/create');
	const token = result.data?.data?.token;

	if (!token) {
		throw new Error('Failed to create cart');
	}

	return token;
}
