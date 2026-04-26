import type { Product } from '#api/api.types';

export interface Props {
	readonly products: Promise<readonly Product[]>;
}
