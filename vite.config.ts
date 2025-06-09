import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const reactCompilerConfig = {
  sources: (filename: string) => filename.includes('src'),
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', reactCompilerConfig]],
      },
    }),
    vanillaExtractPlugin({
      identifiers: 'short',
    }),
  ],
});
