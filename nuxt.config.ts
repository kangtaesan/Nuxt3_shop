// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ko'
      },
      title: 'learn-nuxt3',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'learn-nuxt3' },
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],
  typescript: {
    strict: true,
    tsConfig: {
      target: 'ES2022', // 또는 'ESNext'
      module: 'ESNext',
    }
  },
  css: ['@/assets/css/reset.css'],
  devServer: {
    port: process.env.NODE_ENV === 'production' ? undefined : 5000
  },

  //env config - Nuxt3 runtimeConfig
  runtimeConfig: {
    public: {
      baseURL: process.env.NODE_ENV === 'production'
        ? 'https://my-json-server.typicode.com/joshua1988/nuxt-shopping-api'
        : 'http://localhost:3000'
    }
  }
})
