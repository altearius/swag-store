import { useCallback, useSyncExternalStore } from 'react';
import addToCartFn from './lib/addToCart';
import { loadCart, StorageKey } from './lib/CartStore';
import update from './lib/updateQuantity';

export default function useCart() {
	const cart = useSyncExternalStore(subscribe, loadCart, getServerSnapshot);
	const token = cart?.token;
	const addToCart = useCallback(addToCartFn.bind(null, token), [token]);
	const updateQuantity = useCallback(update.bind(null, token), [token]);
	return { addToCart, contents: cart, updateQuantity };
}

function getServerSnapshot() {
	return undefined;
}

function subscribe(callback: () => void) {
	const handleStorage = (event: StorageEvent) => {
		if (
			event.storageArea === window.sessionStorage &&
			event.key === StorageKey
		) {
			callback();
		}
	};

	window.addEventListener('storage', handleStorage);

	return () => {
		window.removeEventListener('storage', handleStorage);
	};
}
