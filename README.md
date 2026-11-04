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
- Locally, tasks are saved to `data/tasks.json`.

## Deploy to Vercel

Vercel can't write files, so on Vercel tasks are saved to Upstash Redis instead:

1. In your Vercel project, go to **Storage → Create → Upstash (Redis)** and connect it to the project.
2. Make sure the project has these env vars: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
   If the integration created `KV_REST_API_URL` / `KV_REST_API_TOKEN` instead, add the two `UPSTASH_` vars with the same values.
3. Redeploy.

Until the first save, the app shows the tasks from `data/tasks.json`. After that, Redis holds the list, and changes to the file won't show on Vercel.
# daily-checklist
