import { readFile } from 'node:fs/promises'

export default defineEventHandler(async () =>
  JSON.parse(await readFile('data/tasks.json', 'utf8')),
)
