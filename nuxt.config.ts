// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  experimental: {
    appManifest: false
  },
  app: {
    head: {
      title: 'EStore',
      meta: [
        {name: 'description', content: 'Everything about Nuxt 3'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
      ]
    }
  },
})


