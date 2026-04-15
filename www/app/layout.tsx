import type { StoreConfiguration } from '#api/api.types';
import Footer from '#c/footer/Footer';
import Header from '#c/header/Header';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { cacheLife } from 'next/cache';
import type { ReactNode } from 'react';
import getStoreConfiguration from '../api/store/getStoreConfiguration';
import Noto from '../style/fonts/Noto';
import Orbitron from '../style/fonts/Orbiton';
import '../style/global.css';

interface Props {
	readonly children: ReactNode;
}

export default async function RootLayout(p: Props) {
	'use cache';
	cacheLife('weeks');

	return (
		<html lang="en">
			<body className={clsx(Orbitron.variable, Noto.variable)}>
				<Header />
				{p.children}
				<Footer />
			</body>
		</html>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	'use cache';
	cacheLife('weeks');

	const config = await getStoreConfiguration();

	return {
		robots: {
			// Assuming Vercel would rather this example site is not indexed by
			// search engines.
			index: false,
			follow: false,
		},
		...transformMetadata(config),
	};
}

function transformMetadata(config: StoreConfiguration | null): Metadata {
	const seo = config?.seo;

	const { defaultTitle: title, defaultDescription: description } = seo ?? {};

	const data = {
		...(title ? { title } : {}),
		...(description ? { description } : {}),
	};

	return {
		...data,
		openGraph: {
			...data,
			...(config?.storeName ? { siteName: config.storeName } : {}),
			type: 'website',
		},
	};
}
