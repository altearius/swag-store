import updateQuantityApi from '#api/cart/updateQuantity';
import { saveCart } from './CartStore';

export default async function updateQuantity(
	cartToken: string | undefined,
	productId: string,
	quantity: number,
) {
	if (!cartToken) {
		throw new Error('Cart token is required to update item quantity');
	}

	const updatedCart = await updateQuantityApi(cartToken, productId, quantity);

	if (!updatedCart) {
		throw new Error('Failed to update item quantity in cart');
	}

	saveCart(updatedCart);
}
