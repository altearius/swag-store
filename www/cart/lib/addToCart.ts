import addToCartApi from '#api/cart/addToCart';
import { saveCart } from './CartStore';

export default async function addToCart(
	cartToken: string | undefined,
	productId: string,
	quantity: number,
) {
	const updatedCart = await addToCartApi(
		cartToken || null,
		productId,
		quantity,
	);

	if (!updatedCart) {
		throw new Error('Failed to add item to cart');
	}

	saveCart(updatedCart);
}
