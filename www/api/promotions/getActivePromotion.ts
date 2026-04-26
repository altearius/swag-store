'use server';

import createClient from '../createClient';
import type { components } from '../openapi-types';

type Promotion = components['schemas']['Promotion'];

// Note: the documentation says "May return a different promotion on
// each request," which implies that we should not attempt to cache this
// too heavily.

export default async function getActivePromotion() {
	console.log('Fetching active promotion', performance.now());
	const client = createClient();
	const result = await client.GET('/promotions');

	// A real implementation would probably want to check the values of
	// `active`, `validFrom`, and `validUntil` to prevent displaying a
	// promotion that isn't active or valid.
	//
	// This has not been identified as a requirement for this project.
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
