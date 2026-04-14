import search from '../lib/search';
import ResultList from '../result-list/ResultList';

interface Props {
	readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Results(p: Props) {
	const results = (await search(p.searchParams))?.data ?? [];
	return <ResultList results={results} />;
}
