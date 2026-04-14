import createOpenApiClient from 'openapi-fetch';
import getReqEnv from '../lib/getReqEnv';

export default function createClient() {
	const baseUrl = getReqEnv('Api_Base_Url');

	const client = createOpenApiClient<API.paths>({
		baseUrl,
		headers: {
			'x-vercel-protection-bypass': getReqEnv('Api_Token'),
		},
	});

	return client;
}
