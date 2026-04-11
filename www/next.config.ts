import type { NextConfig } from 'next';

const Config: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.vercel-storage.com',
			},
		],
	},
	typedRoutes: true,
};

export default Config;
