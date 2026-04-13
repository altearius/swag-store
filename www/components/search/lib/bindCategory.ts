import { isValidCategory } from '#api/products/isValidCategory';
import bindValue from './bindValue';

export default function bindCategory(raw: string | string[] | undefined) {
	const value = bindValue(raw);

	if (!value) {
		return undefined;
	}

	if (!isValidCategory(value)) {
		return undefined;
	}

	return value;
}
