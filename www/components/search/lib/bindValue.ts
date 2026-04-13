export default function bindValue(raw: string | string[] | undefined) {
	if (raw === undefined) {
		return undefined;
	}

	if (typeof raw === 'string') {
		return raw.trim() || undefined;
	}

	return raw[0]?.trim() || undefined;
}
