import { useCallback, useSyncExternalStore } from 'react';
import addToCartFn from './lib/addToCart';
import { loadCart, StorageKey } from './lib/CartStore';

export default function useCart() {
	const cart = useSyncExternalStore(subscribe, loadCart, getServerSnapshot);
	const addToCart = useCallback(addToCartFn.bind(null, cart), [cart]);
	return { addToCart, contents: cart };
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
