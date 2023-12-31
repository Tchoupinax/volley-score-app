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
    public: {
      endpoint: "http://localhost",
      wsEndpoint: "ws://localhost:12430",
    },
    appConfig: {
      matchSetCount: 51,
      postgres: {
        url: "postgres://postgres:postgres@localhost:5432/postgres"
      },
      setEndPointCount: 10,
      usePostgres: true,
    }
  }
})
