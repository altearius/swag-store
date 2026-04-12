import createClient from '../createClient';
import transformCart from './lib/transformCart';

export default async function createCart() {
	const client = createClient();
	const result = await client.POST('/cart/create');
	return transformCart(result.data);
}
