import type { Cart } from '#api/api.types';
import addToCartApi from '#api/cart/addToCart';
import { saveCart } from './CartStore';

export default async function addToCart(
	cart: Cart | undefined,
	productId: string,
	quantity: number,
) {
	const updatedCart = await addToCartApi(
		cart?.token || null,
		productId,
		quantity,
	);

	if (!updatedCart) {
		throw new Error('Failed to add item to cart');
	}

	saveCart(updatedCart);
}
