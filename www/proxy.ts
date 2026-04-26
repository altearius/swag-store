import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// See reasoning in doc/lessons-learned/Cache Life.md
//
// The idea is that the search results page does double-duty as the hub
// page for products. We want search results to be discoverable by search
// engines and LLMs, and we specifically want to pass PageRank to products.
//
// This means I want an "empty search" results to appear without needing
// JavaScript to load, therefore they must be included in the server response
// HTML rather than being loaded dynamically.
//
// I _also_ want the "empty search" context to have a long cache duration,
// which I've arbitrarily chosen to be "hours" for products. It is probably
// fine for searches that include terms to be no-cache. Pure categories could
// go either way, probably they should be cacheable until proven otherwise.
//
// But once I turn on UI-level caching at the page level, I cannot access
// the query string to find the search term. Therefore, the app/search/page.tsx
// file may not use UI-level caching (so long as I want to use a query string,
// which I do).
//
// This leaves me with no-cache for the page.tsx file, which means I need
// some way to change the cache headers for the specific "empty search" state.

export default function proxy(request: NextRequest) {
	const hasSearchTerm = request.nextUrl.searchParams.has('search');

	if (hasSearchTerm) {
		return NextResponse.next();
	}

	return NextResponse.next({
		headers: {
			'Cache-Control': 's-maxage=3600, stale-while-revalidate=82800',
		},
	});
}

export const config = {
	matcher: '/search',
};
