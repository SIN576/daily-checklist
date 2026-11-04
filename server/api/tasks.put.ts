import { writeFile } from 'node:fs/promises'

// Client sends the whole list; we validate and overwrite the file.
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const ok = Array.isArray(body) && body.every(t =>
    typeof t?.id === 'number' && typeof t?.section === 'string' && typeof t?.group === 'string'
    && typeof t?.text === 'string' && typeof t?.done === 'boolean')
  if (!ok) throw createError({ statusCode: 400, statusMessage: 'Invalid task list' })

  const tasks = body.map(({ id, section, group, text, done }) => ({ id, section, group, text: text.trim(), done }))
  await writeFile('data/tasks.json', JSON.stringify(tasks, null, 2) + '\n')
  return tasks
})
