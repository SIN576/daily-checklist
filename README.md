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

Tasks live in `data/tasks.json`:

```json
[
  { "id": 1, "section": "🌅 Morning", "group": "Start of day", "text": "Review today's priorities", "done": false }
]
```

Tasks are shown grouped by `section` and then `group`, in the order they first appear in the file. To add a new section or group, add a task with that name here. You can edit this file by hand; reload the page to see changes.

## API

| Method | Path         | Body          | Description                 |
|--------|--------------|---------------|-----------------------------|
| GET    | `/api/tasks` | —             | Get all tasks               |
| PUT    | `/api/tasks` | array of tasks | Replace the whole task list |

## Notes

- Every save overwrites the whole file, so with two tabs open the last save wins.
- Needs a writable filesystem (`npm run build && node .output/server/index.mjs`, a VPS, etc.). Serverless hosts like Vercel can't write files.
# daily-checklist
