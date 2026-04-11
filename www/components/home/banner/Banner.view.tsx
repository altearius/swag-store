import type getActivePromotion from '#api/promotions/getActivePromotion';

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
		<section>
			{promo.title ? <h2>{promo.title}</h2> : null}
			{promo.description ? <p>{promo.description}</p> : null}
		</section>
	);
}
