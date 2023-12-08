import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
  ],
  serverHandlers: [
    {
      route: '/ws',
      handler: '~/server-middleware/socket'
    }
  ],
  runtimeConfig: {
    appConfig: {
      setEndPointCount: 10,
      matchSetCount: 51
    }
  }
})
