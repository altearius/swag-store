import useCart from '#cart/useCart';
import style from './Empty.module.css';

export default function Empty() {
	const { contents } = useCart();
	const message = getMessage(contents);

	if (!message) {
		return null;
	}

	return <p className={style['empty']}>{message}</p>;
}

function getMessage(contents: ReturnType<typeof useCart>['contents']) {
	if (contents === undefined) {
		return 'Loading...';
	}

	if (contents === null) {
		return 'You have no cart.';
	}

	if ((contents.totalItems ?? 0) === 0) {
		return 'Your cart is empty.';
	}

	return null;
}
