import getBaseUrl from '#lib/getBaseUrl';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = getBaseUrl();

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/cart',
		},
		sitemap: new URL('/sitemap.xml', baseUrl).toString(),
	};
}
