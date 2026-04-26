'use client';

import type { Promotion } from '#api/api.types';
import getActivePromotion from '#api/promotions/getActivePromotion';
import { useEffect, useState, useTransition } from 'react';
import styles from './Banner.module.css';
import BannerSkeleton from './Banner.skeleton';

export default function Banner() {
	const [isPending, startTransition] = useTransition();
	const [promo, setPromo] = useState<Promotion | null>(null);

	useEffect(() => {
		startTransition(async () => {
			setPromo(await getActivePromotion());
		});
	}, []);

	if (isPending) {
		return <BannerSkeleton />;
	}

	if (!promo) {
		return null;
	}

	if (!promo.title && !promo.description) {
		console.warn('Promotion is missing both title and description');
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
