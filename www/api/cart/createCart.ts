import type { Cart } from '../api.types';
import createClient from '../createClient';
import transformCart from './lib/transformCart';

let createCartPromise: Promise<Cart> | null = null;

export default async function createCart() {
	return (createCartPromise ??= createCartFn());
}

async function createCartFn() {
	const client = createClient();
	const result = await client.POST('/cart/create');
	const cart = transformCart(result.data);

	if (!cart) {
		throw new Error('Failed to create cart');
	}

	createCartPromise = null;
	return cart;
}
