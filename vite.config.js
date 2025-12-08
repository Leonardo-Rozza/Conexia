import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // <--- Única importación extra necesaria

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Bloque para configurar el alias @/
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});