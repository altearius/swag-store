import Cart from './cart/Cart';
import Logo from './logo/Logo';
import Nav from './nav/Nav';

export default function Header() {
	return (
		<header>
			<Logo />
			<Nav />
			<Cart />
		</header>
	);
}
