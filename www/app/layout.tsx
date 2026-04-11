import type { ReactNode } from 'react';
import Header from '../components/header/Header';
import Orbitron from '../style/fonts/Orbiton';
import '../style/global.css';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={Orbitron.variable}>
				<Header />
				{children}
			</body>
		</html>
	);
}
