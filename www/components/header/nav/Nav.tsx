import styles from './Nav.module.css';

export default function Nav() {
	return (
		<nav className={styles['nav']}>
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
