import { isValidCategory } from '#api/products/isValidCategory';
import bindValue from './bindValue';

export default function bindCategory(
	query: Record<string, string | string[] | undefined>,
) {
	const raw = bindValue(query['category']);

	if (!raw) {
		return undefined;
	}

	if (!isValidCategory(raw)) {
		return undefined;
	}

	return raw;
}
