import { StatusCodes } from 'http-status-codes';
import { describe, expect, it } from 'vitest';

describe('/search', () => {
	it('pages with no search terms can be cached', async () => {
		// Act
		const response = await fetch('http://localhost:3000/search');

		// Assert
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.headers.get('cache-control')).toContain('s-maxage=3600');
	});

	it('page two of an empty search is also cached', async () => {
		// Act
		const response = await fetch('http://localhost:3000/search?page=2');

		// Assert
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.headers.get('cache-control')).toContain('s-maxage=3600');
	});

	it('pages with search terms cannot be cached', async () => {
		// Act
		const response = await fetch('http://localhost:3000/search?search=shirt');

		// Assert
		expect(response.status).toBe(StatusCodes.OK);
		expect(response.headers.get('cache-control')).toContain('no-cache');
	});
});
