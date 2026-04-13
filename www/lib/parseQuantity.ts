export default function parseQuantity(rawQuantity: FormDataEntryValue) {
	if (typeof rawQuantity !== 'string') {
		throw new Error('Quantity must be a string');
	}

	const parsed = parseInt(rawQuantity, 10);

	if (Number.isNaN(parsed)) {
		throw new Error('Quantity must be a number');
	}

	return Math.max(0, parsed);
}
