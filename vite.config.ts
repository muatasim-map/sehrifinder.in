import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// Compression plugins for optimized assets (gzip + brotli)
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    // Gzip for broad compatibility
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli for modern browsers (~20% smaller than gzip)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'quranlingo-logo.png'],
      manifest: {
        // Stable ID prevents duplicate installs when start_url changes
        id: '/?source=pwa',
        name: 'Sehri Finder — Ramadan Food Directory',
        short_name: 'SehriFinder',
        description: 'Find verified Sehri spots, Masjids, and community meals during Ramadan. Community-sourced, map-based.',
        theme_color: '#022c22',
        background_color: '#022c22',
        // display_override gives desktop WCO then falls back to standalone
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        scope: '/',
        start_url: '/?source=pwa',
        orientation: 'portrait',
        categories: ['food', 'lifestyle', 'social'],
        prefer_related_applications: false,
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Find Sehri Spots',
            short_name: 'Find',
            description: 'Browse verified sehri spots near you',
            url: '/find/chennai?source=pwa_shortcut',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Add a Spot',
            short_name: 'Submit',
            description: 'Submit a new sehri location',
            url: '/submit?source=pwa_shortcut',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
          }
        ],
        // Rich install carousel shown in Chrome/Edge install dialog
        screenshots: [
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Sehri Finder — Community Ramadan Map'
          }
        ],
        // Web Share Target: lets other apps share URLs/text into Sehri Finder
        share_target: {
          action: '/submit',
          method: 'GET',
          params: {
            title: 'name',
            text: 'description',
            url: 'url'
          }
        }
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        // Offline fallback for navigation requests
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/, /^\/admin/],
        runtimeCaching: [
          // Cache API responses (network-first, 1 week)
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Cache Google Fonts (cache-first, 1 year)
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Cache images (cache-first, 30 days)
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
    // Ensure large assets don't break the build warning limit
    chunkSizeWarningLimit: 1000,
  },
});