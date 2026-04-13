import type { Categories } from '#api/api.types';

export interface Props {
	readonly categories: Promise<Categories>;
}
