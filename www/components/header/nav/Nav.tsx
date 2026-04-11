import clsx from 'clsx';
import styles from './Nav.module.css';

interface Props {
	readonly className?: string | undefined;
}

export default function Nav(p: Props) {
	return (
		<nav className={clsx(styles['nav'], p.className)}>
			<ol>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/search">Search</a>
				</li>
			</ol>
		</nav>
	);
}
