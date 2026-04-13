import { cacheLife } from 'next/cache';
import createClient from '../createClient';

export default async function getStoreConfiguration() {
	'use cache';
	cacheLife('hours');
	const client = createClient();
	const result = await client.GET('/store/config');
	return result.data?.data ?? null;
}
