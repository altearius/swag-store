import type { Promotion } from '#api/api.types';
import getActivePromotion from '#api/promotions/getActivePromotion';
import { useEffect, useState, useTransition } from 'react';

// See notes in doc/lessons-learned/Cache Life.md
//
// I am trying to hit these goals:
//
// - The home page should have a `Cache-Control` header that permits caching
//   by CDNs / browsers for about an hour.
//
// - The banner should show the active promotion, which may change on
//   each page load.
//
// To achieve this, I am fetching the promotion on the client side.

export default function usePromotion() {
	const [isPending, startTransition] = useTransition();
	const [promo, setPromo] = useState<Promotion | null>(null);

	useEffect(() => {
		startTransition(async () => {
			const result = await getActivePromotion();

			if (!result) {
				return;
			}

			if (!result.title && !result.description) {
				console.warn('Promotion is missing both title and description');
				return;
			}

			setPromo(result);
		});
	}, []);

	return { isPending, promo };
}
