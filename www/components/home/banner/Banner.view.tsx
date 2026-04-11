import type getActivePromotion from '#api/promotions/getActivePromotion';
import styles from './Banner.module.css';

interface Props {
	promotion: NonNullable<Awaited<ReturnType<typeof getActivePromotion>>>;
}

export default function BannerView(p: Props) {
	const { promotion: promo } = p;

	if (!promo.title && !promo.description) {
		console.warn('Promotion is missing both title and description');
		return null;
	}

	return (
		<section className={styles['banner']}>
			{promo.title ? <h2>{promo.title}</h2> : null}
			{promo.description ? <p>{promo.description}</p> : null}
			{promo.code ? (
				<p>
					Use code: <strong>{promo.code}</strong>
				</p>
			) : null}
		</section>
	);
}
