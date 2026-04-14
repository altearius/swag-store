import getStoreConfiguration from '#api/store/getStoreConfiguration';
import Home from '#c/home/Home';
import type { Metadata } from 'next';
import formatPageTitle from '../lib/formatPageTitle';

export default async function Page() {
	'use cache';

	return <Home />;
}

export async function generateMetadata(): Promise<Metadata> {
	'use cache';

	const config = await getStoreConfiguration();
	return { title: formatPageTitle(config, 'Home') };
}
