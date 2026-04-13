import clsx from 'clsx';
import Link from 'next/link';
import styles from './Hero.module.css';

// TODO: Docs say this is supposed to have a visual element.
// I'm waiting until I get some products in the store, maybe I'll pick a
// product image or something.

export default function Hero() {
	return (
		<section className={clsx(styles['hero'], 'layout-max-width')}>
			<h1>Welcome to the Swag Store</h1>

			<p>
				<dfn>
					<abbr title="Stolen Without a Gun">SWAG</abbr>
				</dfn>{' '}
				refers to merchandise which has been obtained through nefarious means,
				such as theft. Another common usage refers to promotional items that are
				given away for free.
			</p>

			<p>
				This items have price tags on them, so they aren't free. You may
				therefore assume that these items were originally stolen and are now
				being sold for a profit. We don't ask questions about where the items
				came from, we just sell them.
			</p>

			<p>
				<Link href="/search" className="button">
					Shop Now
				</Link>
			</p>
		</section>
	);
}
