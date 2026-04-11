// Note: I'm thrown a bit because the API contains this documentation:
//
// > All prices are in **cents** (USD). For example, `2800` represents `$28.00`.
//
// But also the product model contains a `currency` property, so maybe the API
// is supposed to support multiple currencies?
//
// I haven't seen any products using a currency other than USD so far.
//
// But it opens up a problem because it implies that "cents" really means
// "the minor unit as defined by ISO 4217" which is not always 1/100 of
// the major unit.

/**
 * Format a product price.
 */
export default function formatPrice(minorUnit: number, currency: string) {
	const formatter = new Intl.NumberFormat('en-US', {
		currency,
		style: 'currency',
	});

	const digits = formatter.resolvedOptions().maximumFractionDigits ?? 0;
	const majorUnit = minorUnit / 10 ** digits;

	return formatter.format(majorUnit);
}
