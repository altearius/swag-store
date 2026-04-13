import type { StoreConfiguration } from '#api/api.types';

export default function formatPageTitle(
	config: StoreConfiguration | null,
	title: string,
) {
	const { titleTemplate } = config?.seo ?? {};
	return titleTemplate ? titleTemplate.replaceAll('%s', title) : title;
}
