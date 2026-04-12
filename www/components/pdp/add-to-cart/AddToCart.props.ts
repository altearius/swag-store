import type { Stock } from '#api/api.types';

export interface Props {
	readonly stock: Promise<Stock | null>;
}
