import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));

export default defineConfig({
	cacheDir: resolve(repoRoot, 'test', '.cache'),
	test: {
		outputFile: {
			html: resolve(repoRoot, 'test', 'reports', 'index.html'),
		},

		projects: [
			{
				test: {
					clearMocks: true,
					environment: 'node',
					include: ['test/int/**/*.test.ts'],
					name: 'integration',
					restoreMocks: true,
				},
			},
		],

		root: repoRoot,
	},
});
