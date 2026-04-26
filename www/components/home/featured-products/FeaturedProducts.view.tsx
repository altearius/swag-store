'use client';

import useBreakpoints from '#lib/useBreakpoints';
import { use } from 'react';
import FeaturedProductsDesktop from './FeaturedProducts.desktop';
import FeaturedProductsMobile from './FeaturedProducts.mobile';
import type { Props } from './FeaturedProducts.types';

export default function FeaturedProductsView(p: Props) {
	const { bp } = useBreakpoints();
	const products = use(p.products);

	if (products.length === 0) {
		return null;
	}

	return bp === 'xs' ? (
		<FeaturedProductsMobile products={p.products} />
	) : (
		<FeaturedProductsDesktop products={p.products} />
	);
}
