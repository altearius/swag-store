import createClient from '../createClient';

export default async function getStoreConfiguration() {
	const client = createClient();
	const result = await client.GET('/store/config');
	return result.data?.data ?? null;
}

export type StoreConfiguration = Awaited<
	ReturnType<typeof getStoreConfiguration>
>;
