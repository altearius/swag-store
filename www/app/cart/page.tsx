import type { StoreConfiguration } from '#api/api.types';
import getStoreConfiguration from '#api/store/getStoreConfiguration';
import CartPage from '#c/cart/Cart';
import formatPageTitle from '#lib/formatPageTitle';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';

// I see the "Cart Functionality" description does _not_ have a Route associated
// with it. I think that implies that I could make this into a dialog or modal
// or something. I personally don't like modals very much so I'm going with a
// dedicated page for it instead.

export default async function Page() {
	'use cache';
	cacheLife('weeks');

	return <CartPage />;
}

export async function generateMetadata(): Promise<Metadata> {
	'use cache';
	cacheLife('weeks');

	const config = await getStoreConfiguration();
	return transformMetadata(config);
}

function transformMetadata(config: StoreConfiguration | null): Metadata {
	return {
		// search engines should not index a cart
		robots: { index: false },
		title: formatPageTitle(config, 'Cart'),
	};
}
