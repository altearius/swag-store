import type { Stock } from '#api/api.types';
import getStock from '#api/stock/getStock';
import { useEffect, useState, useTransition } from 'react';

export default function useStock(slug: string | undefined) {
	const [loading, setLoading] = useState(true);
	const [isPending, startTransition] = useTransition();
	const [stock, setStock] = useState<Stock | null>(null);

	useEffect(() => {
		if (!slug) {
			setStock(null);
			setLoading(false);
			return;
		}

		if (!isPending) {
			startTransition(async () => {
				const stock = await getStock(slug);
				setLoading(false);
				setStock(stock);
			});
		}
	}, [slug]);

	return {
		loading: loading || isPending,
		stock,
	};
}
