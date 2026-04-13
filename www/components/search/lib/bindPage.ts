import bindValue from './bindValue';

export default function bindPage(raw: string | string[] | undefined) {
	const value = bindValue(raw);

	if (!value) {
		return undefined;
	}

	const parsed = parseInt(value, 10);

	if (isNaN(parsed) || parsed < 2) {
		return undefined;
	}

	return parsed;
}
