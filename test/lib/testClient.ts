import createOpenApiClient from 'openapi-fetch';
import type { paths } from '../../www/api/openapi-types';

export default function testClient() {
	const client = createOpenApiClient<paths>({
		baseUrl: process.env['Api_Base_Url'] ?? '',
		headers: {
			'x-vercel-protection-bypass': process.env['Api_Token'],
		},
	});

	return client;
}
