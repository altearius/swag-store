import clsx from 'clsx';
import styles from './Footer.module.css';

export default function Footer() {
	// 'new Date()' is non-deterministic and would typically not play well with
	// a cache. However, since we only use the year value, which only changes
	// once a year, I judge that dealing with the stale year value is preferable
	// than the complication that would come with treating this
	// as non-deterministic.
	const year = new Date().getFullYear();

	return (
		<footer className={clsx(styles['footer'])}>
			{/* @ts-expect-error - hahaha, marquee still works, lol */}
			<marquee>© {year} Swag Store</marquee>
		</footer>
	);
}
