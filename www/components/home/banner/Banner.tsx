'use client';

import styles from './Banner.module.css';
import BannerSkeleton from './Banner.skeleton';
import usePromotion from './usePromotion';

export default function Banner() {
	const { isPending, promo } = usePromotion();

	if (isPending) {
		return <BannerSkeleton />;
	}

	if (!promo) {
		return null;
	}

	return (
		<section className={styles['banner']}>
			<div className="layout-max-width">
				{promo.title ? <h2>{promo.title}</h2> : null}
				{promo.description ? <p>{promo.description}</p> : null}
				{promo.code ? (
					<p>
						Use code: <strong>{promo.code}</strong>
					</p>
				) : null}
			</div>
		</section>
	);
}
