import type { Product } from '#api/api.types';

interface Props {
	readonly product: Product;
}

export default function Meta(p: Props) {
	const {
		currency: priceCurrency,
		description,
		id: productId,
		images: image,
		name,
		price,
	} = p.product;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		...(name ? { name } : {}),
		...(description ? { description } : {}),
		...(image?.length ? { image } : {}),
		...(productId ? { sku: productId } : {}),
		offers: {
			'@type': 'Offer',
			priceCurrency,
			...(price ? { price: formatPriceForJsonLd(price, priceCurrency) } : {}),
		},
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

function formatPriceForJsonLd(minorUnit: number, currency: string): number {
	const formatter = new Intl.NumberFormat('en-US', {
		currency,
		style: 'currency',
	});

	const digits = formatter.resolvedOptions().maximumFractionDigits ?? 0;
	return minorUnit / 10 ** digits;
}
