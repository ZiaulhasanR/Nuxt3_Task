// https://v3.nuxtjs.org/api/configuration/nuxt.config
import {process} from "std-env";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/icon', '@nuxt/image', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
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

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
    }
  }
})


