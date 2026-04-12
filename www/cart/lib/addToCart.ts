import type { Cart } from '#api/api.types';
import addToCartApi from '#api/cart/addToCart';
import createCart from '#api/cart/createCart';
import { CartKey } from './CartKey';
import serialize from './serialize';

export default async function addToCart(
	cart: Cart | undefined,
	productId: string,
	quantity: number,
) {
	const { token } = cart ?? (await createCart());

	if (!token) {
		throw new Error('Failed to resolve cart token');
	}

	const updatedCart = await addToCartApi(token, productId, quantity);

	if (!updatedCart) {
		throw new Error('Failed to add item to cart');
	}

	window.sessionStorage.setItem(CartKey, serialize(updatedCart));
}
