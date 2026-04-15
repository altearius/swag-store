import clsx from 'clsx';
import { cacheLife } from 'next/cache';
import styles from './Footer.module.css';

export default async function Footer() {
	'use cache';
	cacheLife('weeks');

	// The call to `new Date()` is non-deterministic and is mentioned specifically
	// in the documentation as something that needs to be handled specially for
	// cache components.
	const year = new Date().getFullYear();

	return (
		<footer className={clsx(styles['footer'])}>
			{/* @ts-expect-error - hahaha, marquee still works, lol */}
			<marquee>© {year} Swag Store</marquee>
		</footer>
	);
}
