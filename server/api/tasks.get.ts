import seed from '../../data/tasks.json'

// Fall back to the bundled file until the first save (empty Redis on Vercel)
export default defineEventHandler(async () =>
  (await useStorage('data').getItem('tasks.json')) ?? seed,
)
