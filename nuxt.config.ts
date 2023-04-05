// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      url: process.env.NEWS_URL,
      key: process.env.NEWS_KEY,
    },
  },
})
