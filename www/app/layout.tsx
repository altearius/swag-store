import clsx from 'clsx';
import type { ReactNode } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Noto from '../style/fonts/Noto';
import Orbitron from '../style/fonts/Orbiton';
import '../style/global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={clsx(Orbitron.variable, Noto.variable)}>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
