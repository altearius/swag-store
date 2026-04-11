import getActivePromotion from '#api/promotions/getActivePromotion';
import BannerView from './Banner.view';

export default async function Banner() {
	const promotion = await getActivePromotion();

	// A real implementation would probably want to check the values of
	// `active`, `validFrom`, and `validUntil` to prevent displaying a
	// promotion that isn't active or valid.
	//
	// This has not been identified as a requirement for this project.
	if (!promotion) {
		console.warn('No active promotion found');
		return null;
	}

	return <BannerView promotion={promotion} />;
}
