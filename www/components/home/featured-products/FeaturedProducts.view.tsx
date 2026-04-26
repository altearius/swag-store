'use client';

import useBreakpoints from '#lib/useBreakpoints';
import FeaturedProductsDesktop from './FeaturedProducts.desktop';
import FeaturedProductsMobile from './FeaturedProducts.mobile';
import type { Props } from './FeaturedProducts.types';

export default function FeaturedProductsView(p: Props) {
	const { bp } = useBreakpoints();

	const Variant =
		bp === 'xs' ? FeaturedProductsMobile : FeaturedProductsDesktop;

	return p.products.length ? <Variant {...p} /> : null;
}
