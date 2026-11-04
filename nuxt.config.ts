export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  nitro: {
    storage: {
      // Vercel can't write files, so tasks go to Upstash Redis there
      // (reads UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN at runtime)
      data: process.env.VERCEL ? { driver: 'upstash' } : { driver: 'fs', base: './data' },
    },
  },
})
