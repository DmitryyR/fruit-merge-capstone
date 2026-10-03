import { defineConfig } from 'vite';
export default defineConfig(({ mode }) => ({ base: './', build: { outDir: mode === 'e2e' ? 'dist-e2e' : 'dist', chunkSizeWarningLimit: 1600 }, define: { __E2E__: JSON.stringify(mode === 'e2e') } }));
