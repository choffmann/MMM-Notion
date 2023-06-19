import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '.'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/MMM-Notion.ts'),
      },
      output: {
        entryFileNames: `MMM-Notion.js`,
      },
    },
  },
});
