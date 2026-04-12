import type { Stock } from '#api/stock/getStock';

export interface Props {
	readonly stock: Promise<Stock | null>;
}
