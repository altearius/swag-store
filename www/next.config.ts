import type { NextConfig } from 'next';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

const Config: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: getRemotePatterns(),
	},
	typedRoutes: true,
};

export default Config;

function getRemotePatterns(): (URL | RemotePattern)[] {
	const apiUrl = process.env['Api_Base_Url'];

	if (apiUrl?.startsWith('https://vercel-swag-store-api.vercel.app')) {
		return [
			{
				protocol: 'https',
				hostname: '**.vercel-storage.com',
			},
		];
	}

	return [{ hostname: '**' }];
}
