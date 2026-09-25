# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of twelve
lifts, open a workout to see full instructions and specs, lock lifts into
today's plan or save them for later, and track your plan's exercises, minutes,
and calories as you go.

## Description

FitLog lets you pick a lift, lock it into today's plan, and watch the week's
work add up. The Home page shows the full workout library fetched live from
the FitLog API; each workout has its own detail page with instructions and key
specs; and the My Plan page tracks what you've queued up for today plus what
you've saved for later — all persisted locally so a reload never wipes your
plan.

## Technologies Used

- **Next.js 14** (App Router) — routing, layouts, and page rendering
- **React 18** — UI and client-side state
- **TypeScript** — type-safe components and data models
- **Tailwind CSS** — styling and responsive layout
- **lucide-react** — icon set
- **FitLog API** (`https://api.abcz.workers.dev/api/fitlog`) — workout data

## Key Features

1. **Responsive workout library** — a 3×4 grid on large screens that collapses
   gracefully down to a single column on mobile, with each card showing an
   image, category tags, equipment, and a duration / calories / rating stats
   row.
2. **Sort & search** — reorder the library by Duration, Calories, or Rating,
   and search the library (and My Plan) by workout name or muscle-group tag.
3. **Workout detail pages** — a two-column layout with a large image, key
   specs panel, and a numbered instructions list, plus "Add to today's plan"
   and "Save for later" actions with toast confirmations.
4. **My Plan tracking** — live Exercises / Minutes / Calories summary cards,
   Today's Plan and Saved tabs, a five-lift daily cap, and per-card
   Mark as Done / Remove actions.
5. **Persistent state** — the plan and saved lists are stored in
   `localStorage`, so navigating away or reloading the page never loses your
   progress; the navbar's Plan and Saved badges always reflect the live
   counts.
6. **Polished states throughout** — a loading state while the library and API
   data fetch, an empty state on My Plan ("Nothing here yet"), and a custom
   404 page for unknown routes.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Submission

- Live Link:
- GitHub Repository Link:
