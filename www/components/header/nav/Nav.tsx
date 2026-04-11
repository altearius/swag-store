import clsx from 'clsx';
import Link from 'next/link';
import styles from './Nav.module.css';

interface Props {
	readonly className?: string | undefined;
}

export default function Nav(p: Props) {
	return (
		<nav className={clsx(styles['nav'], p.className)}>
			<ol>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<a href="/search">Search</a>
				</li>
			</ol>
		</nav>
	);
}
