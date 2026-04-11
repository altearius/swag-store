import clsx from 'clsx';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Noto from '../style/fonts/Noto';
import Orbitron from '../style/fonts/Orbiton';
import '../style/global.css';

interface Props {
	readonly children: ReactNode;
}

export default async function RootLayout(p: Props) {
	'use cache';

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

export const metadata: Metadata = {
	title: 'Swag Store',
	description: 'A store for swag',
	openGraph: {
		title: 'Swag Store',
		description: 'A store for swag',
		siteName: 'Swag Store',
		type: 'website',
	},
	robots: {
		// Assuming Vercel would rather this example site is not indexed by
		// search engines.
		index: false,
		follow: false,
	},
};
