import type { Cart } from '#api/api.types';
import parse from './parse';
import serialize from './serialize';

export const StorageKey = 'www.cart.lib.CartStore';
let snapshot: Cart | undefined;

export function loadCart(): Cart | undefined {
	const raw = window.sessionStorage.getItem(StorageKey);

	if (!raw) {
		return undefined;
	}

	const cart = parse(raw);

	// There's probably some race condition here. Why doesn't the API include
	// a rowVersion for the cart? Why does the API declare updatedAt is
	// optional? Am I intended to reason out concurrency issues in the client,
	// as part of a certification exercise? Am I overthinking it?
	if (snapshot && snapshot.updatedAt.valueOf() === cart.updatedAt.valueOf()) {
		return snapshot;
	}

	snapshot = cart;
	return snapshot;
}

export function saveCart(cart: Cart | undefined) {
	if (cart) {
		updateCart(cart);
	} else {
		removeCart();
	}
}

function removeCart() {
	const oldValue = window.sessionStorage.getItem(StorageKey);
	window.sessionStorage.removeItem(StorageKey);
	snapshot = undefined;

	if (!oldValue) {
		return;
	}

	window.dispatchEvent(
		new StorageEvent('storage', {
			key: StorageKey,
			newValue: null,
			oldValue,
			storageArea: window.sessionStorage,
			url: window.location.href,
		}),
	);
}

function updateCart(cart: Cart) {
	const existing = loadCart();

	if (existing && existing.updatedAt.valueOf() === cart.updatedAt.valueOf()) {
		return;
	}

	const serialized = serialize(cart);
	const oldValue = window.sessionStorage.getItem(StorageKey);

	window.sessionStorage.setItem(StorageKey, serialized);
	snapshot = cart;

	window.dispatchEvent(
		new StorageEvent('storage', {
			key: StorageKey,
			newValue: serialized,
			oldValue,
			storageArea: window.sessionStorage,
			url: window.location.href,
		}),
	);
}
