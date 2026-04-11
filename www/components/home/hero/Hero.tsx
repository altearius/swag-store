import styles from './Hero.module.css';

// TODO: Docs say this is supposed to have a visual element.
// I'm waiting until I get some products in the store, maybe I'll pick a
// product image or something.

export default function Hero() {
	return (
		<section className={styles['hero']}>
			<h1>Welcome to the Swag Store</h1>
			<p>Get your swag on with our exclusive merchandise!</p>
			<p>
				<a href="/products">Shop Now</a>
			</p>
		</section>
	);
}
