import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-07-15',

  vite: {
    plugins: [
      // @ts-expect-error
      vuetify({ autoImport: true }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  eslint: {
    config: {
      stylistic: true, // lets ESLint handle formatting instead of Prettier
    },
  },
})