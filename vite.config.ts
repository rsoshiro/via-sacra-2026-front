import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: Substitua 'via-sacra-2026-front' pelo nome exato do seu repositório no GitHub se for diferente.
  base: '/via-sacra-2026-front/', 
})