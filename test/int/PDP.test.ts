import { StatusCodes } from 'http-status-codes';
import { describe, expect, it } from 'vitest';
import testClient from '../lib/testClient';

describe('/products/[slug]', () => {
	it('invalid product has expected status and headers', async () => {
		// Arrange
		const url = `http://localhost:3000/products/does-not-exist`;

		// Act
		const response = await fetch(url, { headers: { Prefer: 'code=404' } });

		// Assert
		expect(response.status).toBe(StatusCodes.NOT_FOUND);
		expect(response.headers.get('cache-control')).toContain('s-maxage=3600');
	});

	it('valid product has expected status and headers', async () => {
		// Arrange
		const slug = await getValidProduct();
		const encoded = encodeURIComponent(slug ?? '');
		const url = `http://localhost:3000/products/${encoded}`;

		// Act
		const response = await fetch(url);

		// Assert
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.headers.get('cache-control')).toContain('s-maxage=3600');
	});
});

async function getValidProduct() {
	const client = testClient();

	const result = await client.GET('/products', {
		params: { query: { limit: 1 } },
	});

	const data = Array.from(result.data?.data ?? []);
	return data[0]?.slug;
}
