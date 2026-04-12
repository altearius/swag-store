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

	return (
		<ul className={style['contents']}>
			{contents.items.map((item, idx) => (
				<li key={item.productId ?? idx}>
					<Item item={item} />
				</li>
			))}
		</ul>
	);
}
