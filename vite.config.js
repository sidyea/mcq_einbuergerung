import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'questions.csv'],
      manifest: {
        name: 'Einbürgerungstest',
        short_name: 'Einbürgerung',
        description: 'Practice MCQs for the German citizenship test',
        theme_color: '#863bff',
        background_color: '#e8f4fd',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        additionalManifestEntries: [
          { url: '/questions.csv', revision: null },
        ],
        runtimeCaching: [
          {
            urlPattern: /\/questions\.csv$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'csv-cache',
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
})
