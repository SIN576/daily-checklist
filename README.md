# Daily Checklist

A small Nuxt app for a daily checklist. Tasks are stored in a JSON file.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- Add, edit (inline), and delete tasks
- Check / uncheck tasks
- **Reset all** — uncheck every task

## Data

Tasks are saved in your browser (`localStorage`), so each browser or device has its own list. Clearing site data erases it.

`data/tasks.json` is the starting list that a new browser begins with:

```json
[
  { "id": 1, "section": "🌅 Morning", "group": "Start of day", "text": "Review today's priorities", "done": false }
]
```

Tasks are shown grouped by `section` and then `group`, in the order they first appear. To add a new section or group, add a task with that name to the file. Browsers that already have a saved list won't pick up changes to the file. To start over from the file, clear the site data for the page.

## Deploy

There's no server or database, so it deploys to Vercel (or any static host) with no setup.

# daily-checklist
