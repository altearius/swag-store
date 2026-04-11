import type { Config } from 'stylelint';

export default {
	extends: ['stylelint-config-standard'],
	reportDescriptionlessDisables: true,
	reportInvalidScopeDisables: true,
	reportNeedlessDisables: true,
} satisfies Config;
