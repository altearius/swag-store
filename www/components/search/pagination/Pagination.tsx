import { Suspense } from 'react';
import bindCategory from '../lib/bindCategory';
import bindValue from '../lib/bindValue';
import search from '../lib/search';
import style from './Pagination.module.css';
import PaginationLink from './PaginationLink';

interface Props {
	readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default function Pagination(p: Props) {
	return (
		<nav className={style['pagination']}>
			<Suspense>
				<PaginationList {...p} />
			</Suspense>
		</nav>
	);
}

async function PaginationList(p: Props) {
	const meta = (await search(p.searchParams))?.meta;

	if (!meta) {
		return null;
	}

	const { pagination } = meta;

	if (!pagination) {
		return null;
	}

	const { hasNextPage, hasPreviousPage, page = 1, totalPages } = pagination;

	const query = await p.searchParams;
	const term = bindValue(query['search']);
	const category = bindCategory(query['category']);
	const params = { category, term };

	return (
		<p>
			<PaginationLink
				{...params}
				page={1}
				enabled={Boolean(hasPreviousPage)}
				title="First page"
			>
				⇤
			</PaginationLink>
			<PaginationLink
				{...params}
				page={page - 1}
				enabled={Boolean(hasPreviousPage)}
				title="Previous page"
			>
				←
			</PaginationLink>
			<span>
				Page {page.toLocaleString()}
				{typeof totalPages === 'number'
					? ` of ${totalPages.toLocaleString()}`
					: null}
			</span>
			<PaginationLink
				{...params}
				page={page + 1}
				enabled={Boolean(hasNextPage)}
				title="Next page"
			>
				→
			</PaginationLink>
			<PaginationLink
				{...params}
				page={totalPages ?? 0}
				enabled={typeof totalPages === 'number' && page < totalPages}
				title="Last page"
			>
				⇥
			</PaginationLink>
		</p>
	);
}
