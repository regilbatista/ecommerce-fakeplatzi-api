import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://regilbatista.github.io/ecommerce-fakeplatzi-api',
  build: {
    outDir: 'dist',
  },
  
})
