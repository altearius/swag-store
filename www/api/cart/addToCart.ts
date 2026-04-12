import createClient from '../createClient';
import transformCart from './lib/transformCart';

export default async function addToCart(
	cartToken: string,
	productId: string,
	quantity: number,
) {
	const client = createClient();

	const result = await client.POST('/cart', {
		body: { productId, quantity },
		params: { header: { 'x-cart-token': cartToken } },
	});

	return transformCart(result.data);
}
