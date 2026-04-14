import createOpenApiClient from 'openapi-fetch';
import getReqEnv from '../lib/getReqEnv';
import type { paths } from './openapi.d.yaml';

export default function createClient() {
	const baseUrl = getReqEnv('Api_Base_Url');

	const client = createOpenApiClient<paths>({
		baseUrl,
		headers: {
			'x-vercel-protection-bypass': getReqEnv('Api_Token'),
		},
	});

	return client;
}
