import { useCallback, useSyncExternalStore } from 'react';
import type { Cart } from '../api/api.types';
import addToCartFn from './lib/addToCart';
import { CartKey } from './lib/CartKey';
import parse from './lib/parse';
import serialize from './lib/serialize';

export default function useCart() {
	const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const addToCart = useCallback(addToCartFn.bind(null, cart), [cart]);
	return { addToCart, contents: cart };
}

export function setCart(cart: Cart) {
	window.sessionStorage.setItem(CartKey, serialize(cart));
}

function getServerSnapshot() {
	return undefined;
}

function getSnapshot() {
	const raw = window.sessionStorage.getItem(CartKey);
	return raw ? parse(raw) : undefined;
}

function subscribe(callback: () => void) {
	const handleStorage = (event: StorageEvent) => {
		if (event.storageArea === window.sessionStorage && event.key === CartKey) {
			callback();
		}
	};

	window.addEventListener('storage', handleStorage);

	return () => {
		window.removeEventListener('storage', handleStorage);
	};
}
