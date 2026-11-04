<script setup lang="ts">
type Task = { id: number, section: string, group: string, text: string, done: boolean }

useHead({ title: 'Daily Checklist' })

const { data: tasks } = await useFetch<Task[]>('/api/tasks', { default: () => [] })

// section -> group -> tasks, in the order they first appear in the file
const sections = computed(() => {
  const map = new Map<string, Map<string, Task[]>>()
  for (const t of tasks.value) {
    if (!map.has(t.section)) map.set(t.section, new Map())
    const groups = map.get(t.section)!
    if (!groups.has(t.group)) groups.set(t.group, [])
    groups.get(t.group)!.push(t)
  }
  return map
})

const doneCount = computed(() => tasks.value.filter(t => t.done).length)

async function save() {
  tasks.value = await $fetch<Task[]>('/api/tasks', { method: 'PUT', body: tasks.value })
}

function add(section: string, group: string, e: Event) {
  const input = e.target as HTMLInputElement
  const text = input.value.trim()
  if (!text) return
  tasks.value.push({ id: Date.now(), section, group, text, done: false })
  input.value = ''
  save()
}

function remove(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
  save()
}

// Clearing a task's text deletes it
function edit(t: Task) {
  t.text.trim() ? save() : remove(t.id)
}

function reset() {
  tasks.value.forEach(t => (t.done = false))
  save()
}
</script>

<template>
  <main>
    <header>
      <h1>Daily Checklist</h1>
      <div class="toolbar">
        <span>{{ doneCount }} / {{ tasks.length }} done</span>
        <progress :value="doneCount" :max="tasks.length || 1" aria-label="Progress" />
        <button :disabled="!doneCount" @click="reset">Reset</button>
      </div>
    </header>

    <section v-for="[section, groups] in sections" :key="section">
      <h2>{{ section }}</h2>
      <div v-for="[group, items] in groups" :key="group" class="group">
        <h3>{{ group }}</h3>
        <ul>
          <li v-for="t in items" :key="t.id">
            <input v-model="t.done" type="checkbox" :aria-label="`Done: ${t.text}`" @change="save">
            <input v-model="t.text" class="text" :class="{ done: t.done }" aria-label="Task" @change="edit(t)">
            <button class="del" aria-label="Delete task" @click="remove(t.id)">✕</button>
          </li>
          <li class="new">
            <span class="plus" aria-hidden="true">+</span>
            <input class="text" placeholder="Add task" :aria-label="`Add task to ${group}`" @keydown.enter="add(section, group, $event)">
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style>
:root {
  --bg: #191919;
  --fg: #ebebeb;
  --muted: #8a8a8a;
  --line: #3a3a3a;
  --accent: #2383e2;
  color-scheme: dark;
}
@media (prefers-color-scheme: light) {
  :root { --bg: #fff; --fg: #37352f; --muted: #9b9a97; --line: #e3e2e0; color-scheme: light; }
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font: 17px/1.5 ui-sans-serif, -apple-system, "Segoe UI", Helvetica, sans-serif;
}
main { max-width: 720px; margin: 0 auto; padding: 64px 24px 96px; }

h1 { font-size: 44px; line-height: 1.15; margin: 0 0 12px; }
h2 { font-size: 30px; margin: 48px 0 8px; }
h3 { font-size: 20px; margin: 24px 0 6px; }

.toolbar { display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: 14px; }
progress { flex: 1; height: 4px; appearance: none; border: 0; border-radius: 2px; background: var(--line); overflow: hidden; }
progress::-webkit-progress-bar { background: var(--line); }
progress::-webkit-progress-value { background: var(--accent); transition: width .2s; }
progress::-moz-progress-bar { background: var(--accent); }

button {
  font: inherit; color: var(--fg); background: none; cursor: pointer;
  border: 1px solid var(--line); border-radius: 6px; padding: 4px 12px;
}
button:hover:not(:disabled) { background: var(--line); }
button:disabled { color: var(--muted); cursor: default; }

ul { list-style: none; margin: 0; padding: 0; }
li { display: flex; align-items: center; gap: 10px; padding: 3px 0; }

input[type=checkbox] {
  appearance: none; flex: none; margin: 0 2px; width: 18px; height: 18px; cursor: pointer;
  border: 1.5px solid var(--fg); border-radius: 2px; display: grid; place-content: center;
}
input[type=checkbox]:checked { background: var(--accent); border-color: var(--accent); }
input[type=checkbox]:checked::after { content: ""; width: 5px; height: 10px; border: solid #fff; border-width: 0 2px 2px 0; transform: translateY(-1px) rotate(45deg); }

.text { flex: 1; min-width: 0; font: inherit; color: inherit; background: none; border: 0; outline: 0; padding: 0; }
.text.done { color: var(--muted); text-decoration: line-through; }
.text::placeholder { color: var(--muted); }

.del { border: 0; padding: 0 6px; color: var(--muted); opacity: 0; }
li:hover .del, .del:focus-visible { opacity: 1; }

.new { opacity: .6; }
.new:focus-within { opacity: 1; }
.plus { width: 22px; text-align: center; color: var(--muted); font-size: 20px; line-height: 1; }

:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
</style>
