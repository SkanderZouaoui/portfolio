import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Utilisation de './' pour les chemins relatifs sur GitHub Pages
  base: './',
})
