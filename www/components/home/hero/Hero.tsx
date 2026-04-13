import Link from 'next/link';
import SwagCat from '../swag-cat/SwagCat';
import styles from './Hero.module.css';

export default function Hero() {
	return (
		<section className={styles['hero']}>
			<h1 className="layout-max-width">Welcome to the Swag Store</h1>

			<SwagCat />

			<div className="layout-max-width">
				<p>
					<dfn>
						<abbr title="Stolen Without a Gun">SWAG</abbr>
					</dfn>{' '}
					refers to merchandise which has been obtained through nefarious means,
					such as theft. Another common usage refers to promotional items that
					are given away for free.
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
			</div>
		</section>
	);
}
