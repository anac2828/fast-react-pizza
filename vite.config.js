import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), eslint()],
    build: { outDir: 'dist' },
    base: command === 'serve' ? '/' : '/fast-react-pizza',
  }
})
