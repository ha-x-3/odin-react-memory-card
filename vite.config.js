import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/odin-react-memory-card',
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './tests/setup.js',
	},
});
