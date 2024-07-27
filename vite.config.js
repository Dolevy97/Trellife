import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [react()],
		build: {
			outDir: '../backend/public',
			emptyOutDir: true,
			// sourcemap: true, // Enable source maps for debugging
		},
	}
})