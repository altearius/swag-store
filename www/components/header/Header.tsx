import Cart from './cart/Cart';
import styles from './Header.module.css';
import Logo from './logo/Logo';
import Nav from './nav/Nav';

export default function Header() {
	return (
		<header className={styles['header']}>
			<Logo className={styles['logo']} />
			<Nav className={styles['nav']} />
			<Cart className={styles['cart']} />
		</header>
	);
}
