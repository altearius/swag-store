import Link from 'next/link';
import type { ReactNode } from 'react';

interface Props {
	readonly children: ReactNode;
	readonly term: string | undefined;
	readonly category: string | undefined;
	readonly enabled: boolean;
	readonly page: number;
	readonly title: string;
}

export default function PaginationLink(p: Props) {
	if (!p.enabled) {
		return (
			<span className="button" title={p.title}>
				{p.children}
			</span>
		);
	}

	const term = p.term ? encodeURIComponent(p.term) : undefined;
	const category = p.category ? encodeURIComponent(p.category) : undefined;
	const page = p.page > 1 ? p.page : undefined;

	const params = new URLSearchParams();

	if (term) {
		params.set('search', term);
	}

	if (category) {
		params.set('category', category);
	}

	if (page) {
		params.set('page', page.toString());
	}

	const query = params.toString();
	const href = query ? (`?${query}` as const) : ('/search' as const);

	return (
		<Link href={href} className="button" title={p.title}>
			{p.children}
		</Link>
	);
}
