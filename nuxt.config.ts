export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Client-only: tasks are read from localStorage, which the server can't see
  ssr: false,
})
