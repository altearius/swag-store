import createClient from '../createClient';

export default async function getActivePromotion() {
	const client = createClient();
	return client.GET('/promotions');
}
