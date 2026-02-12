// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  routeRules: {
    '/': {
      swr: 3600,
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'ForgeHex',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preload',
          href: '/fonts/AnonymousPro-Bold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxt-svgo', '@nuxt/image', '@tresjs/nuxt', '@nuxt/icon'],
  tres: {
    devtools: true,
  },
  image: {
    format: ['avif', 'webp'],
    quality: 70,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    densities: [1, 2],
  },
  svgo: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              cleanupIds: false,
            },
          },
        },
      ],
    },
  },
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  vite: {
    // @ts-expect-error Nuxt issue with plugin type
    plugins: [tailwindcss()],
  },
});
