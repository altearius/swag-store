import type { CartItem } from '#api/api.types';
import useCart from '../../../cart/useCart';
import Item from '../item/Item';
import style from './Contents.module.css';

export default function Contents() {
	const { contents } = useCart();

	if (contents === undefined) {
		return <p>Loading...</p>;
	}

	if (contents === null || (contents.totalItems ?? 0) === 0) {
		return <p>Your cart is empty.</p>;
	}

	const sortedItems = [...contents.items].sort(sortItems);

	return (
		<ul className={style['contents']}>
			{sortedItems.map((item, idx) => (
				<li key={item.productId ?? idx}>
					<Item item={item} />
				</li>
			))}
		</ul>
	);
}

function sortItems(a: CartItem, b: CartItem) {
	const addedAtA = a.addedAt?.valueOf() ?? 0;
	const addedAtB = b.addedAt?.valueOf() ?? 0;

	if (addedAtA < addedAtB) {
		return -1;
	}

	if (addedAtA > addedAtB) {
		return 1;
	}

	const productIdA = a.productId ?? a.product?.id ?? '';
	const productIdB = b.productId ?? b.product?.id ?? '';

	if (productIdA < productIdB) {
		return -1;
	}

	if (productIdA > productIdB) {
		return 1;
	}

	return 0;
}
