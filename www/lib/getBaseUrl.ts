export default function getBaseUrl() {
	const defaultDomain = 'localhost:3000';
	const domain = process.env['VERCEL_PROJECT_PRODUCTION_URL'] || defaultDomain;
	const protocol = domain === defaultDomain ? 'http' : 'https';
	return new URL(protocol + '://' + domain);
}
