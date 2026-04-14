import createClient from '../createClient';
import type { components } from '../openapi.d.yaml';

type Promotion = components['schemas']['Promotion'];

// Note: the documentation says "May return a different promotion on
// each request," which implies that we should not attempt to cache this
// too heavily.

export default async function getActivePromotion() {
	const client = createClient();
	const result = await client.GET('/promotions');
	return transform(result.data?.data);
}

function transform(promotion: Promotion | null | undefined) {
	if (!promotion) {
		return null;
	}

	const { validFrom, validUntil, ...rest } = promotion;

	return {
		...rest,
		...(validFrom ? { validFrom: new Date(validFrom) } : {}),
		...(validUntil ? { validUntil: new Date(validUntil) } : {}),
	} as const;
}
