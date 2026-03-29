import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/adumun/",

  build: {
    chunkSizeWarningLimit: 2000, // Set the warning limit to 2MB

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          if (id.includes('src/app/components')) {
            return 'components';
          }

          if (id.includes('src/app/contexts')) {
            return 'contexts';
          }

          if (id.includes('src/app/utils')) {
            return 'utils';
          }

          if (id.includes('src/app/constants')) {
            return 'constants';
          }

          if (id.includes('src/app/hooks')) {
            return 'hooks';
          }

          if (id.includes('src/app/pages')) {
            return 'pages';
          }

          if (id.includes('src/app')) {
            return 'app';
          }

          return null;
        }
      }
    }
  }
})
