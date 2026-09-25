# FitLog

FitLog is a dark, no-nonsense workout library and fitness planner built for people who want to discover workouts, build a daily plan, and keep track of completed exercises. 

**Live Link:** https://fit-log-ph.vercel.app/

## Description

FitLog lets you pick a lift, lock it into today's plan, and watch the week's
work add up. The Home page shows the full workout library fetched live from
the FitLog API; each workout has its own detail page with instructions and key
specs; and the My Plan page tracks what you've queued up for today plus what
you've saved for later — all persisted locally so a reload never wipes your
plan.

## 🛠️ Technologies Used

- **Next.js** — React framework for the application
- **React** — Component-based UI development
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Responsive styling
- **DaisyUI** — UI components
- **React Icons** — Interface icons
- **React Toastify** — Toast notifications
- [FitLog API](https://api.abcz.workers.dev/api/fitlog) — Workout data

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

**Clone the repository:**
```bash
git clone https://github.com/jubumax/Fit-Log-B14-A06
```

**Run these commands in VS Code terminal:**

```bash
npm install
npm run dev
```

**Open [http://localhost:3000](http://localhost:3000)**

---

© 2026 FitLog - [@jubumax](https://linkedin.com/in/jubumax)
