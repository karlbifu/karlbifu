import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Nom du dépôt GitHub -> le site sera servi depuis /karlbifu/
  base: '/karlbifu/',
})
