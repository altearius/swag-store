import type { Stock } from '#api/api.types';
import getStock from '#api/stock/getStock';
import { useEffect, useState } from 'react';

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
