import { StatusCodes } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

describe('/cart', () => {
	it('has expected status and headers', async () => {
		// Act
		const response = await fetch('http://localhost:3000/cart');

		// Assert
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.headers.get('cache-control')).toContain('s-maxage=604800');
	});
});
