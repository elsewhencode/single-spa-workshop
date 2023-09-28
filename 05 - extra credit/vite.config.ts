import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '', 'VITE_');
  return {
    plugins: [react()],
    base: env.VITE_BASE_URL,
    build: {
      rollupOptions: {
        input: {
          'root-config': 'src/root-config.ts',
          main: 'src/main.tsx'
        },
        output: {
          entryFileNames: '[name].js',
          format: 'system'
        }
      }
    }
  };
})
