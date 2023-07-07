import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';

const config = {
  mmm_notion: {
    input: {
      main: resolve(__dirname, 'src/MMM-Notion.ts'),
    },
    output: {
      entryFileNames: `MMM-Notion.js`,
      assetFileNames: `styles/MMM-Notion.css`,
      format: `cjs`
    }
  },
  node_helper: {
    input: {
      main: resolve(__dirname, 'src/node_helper.ts'),
    },
    output: {
      entryFileNames: `node_helper.js`,
      format: `cjs`
    },
  }
}

const currentConfig = config[process.env.LIB_NAME];

if (currentConfig === undefined) {
  throw new Error('LIB_NAME is not defined or is not valid');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '.'),
    emptyOutDir: false,
    rollupOptions: {
      ...currentConfig,
    },
  },
});
