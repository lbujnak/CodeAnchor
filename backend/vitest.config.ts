import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['_tests_/**/*.test.ts'],
		exclude: ['/', 'dist/**', '_mocks_/**' ],
		coverage: {
			exclude: ['/', 'dist/**', '_mocks_/**' ],
			reporter: ['text', 'html']
		},
		server: {
			deps: {
				inline: [/^(?!.*node_modules).*$/],
			}
		}
	},
});