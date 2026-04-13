import type { Stock } from '#api/api.types';
import getStock from '#api/stock/getStock';
import { useEffect, useState } from 'react';

// I was originally using streaming to load the stock information and pipe
// it into the client component using `use`.
//
// However, because this data has a very small cache duration, I became
// concerned that handling it in this way would affect the cache duration of
// the product detail page as a whole.
//
// So I refactored to use a server action to fetch the stock information on
// demand from the client component instead, under the assumption that the
// product detail page's cache lifecycle can now be tied to the much longer
// cache duration for the product details themselves.
//
// The last git commit that contained the previous implementation is
// c66758cd513567b23c5d197efd1755b13f399d52.

export default function useStock(slug: string | undefined) {
	const [loading, setLoading] = useState(true);
	const [stock, setStock] = useState<Stock | null>(null);

	useEffect(() => {
		if (!slug) {
			setStock(null);
			setLoading(false);
			return;
		}

		setLoading(true);

		void (async () => {
			const stock = await getStock(slug);
			setStock(stock);
			setLoading(false);
		})();
	}, [slug]);

	return { loading, stock };
}
