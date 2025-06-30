import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/my-pwa-app/',        // tämä on tärkeä GitHub Pagesille
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'my Test PWA',
        short_name: 'TestPWA',
        start_url: '/my-pwa-app/',
        scope: '/my-pwa-app/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        lang: 'en',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});
