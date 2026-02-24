import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'jsdom',
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
	}
})