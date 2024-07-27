import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [react()],
		build: {
			outDir: '../backend/public',
			emptyOutDir: true,
			assetsDir: 'assets',
			sourcemap: true, // Enable source maps for debugging
		},
	}
})