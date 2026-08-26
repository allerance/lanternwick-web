# lanternwick-web

Lanternwick is a small community "lantern wall" web app. Visitors light a
lantern with a short message, which is stored on the server and rendered back
to everyone who visits.

Built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript,
and Tailwind CSS v4.

## Getting started

Install dependencies and start the dev server:

```bash
npm ci
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

## Project structure

- `src/app/page.tsx` — landing page with the lantern wall.
- `src/app/components/LanternWall.tsx` — client component for viewing and
  lighting lanterns.
- `src/app/api/lanterns/route.ts` — `GET`/`POST` API for the lantern store.
- `src/lib/lanterns.ts` — in-memory lantern store and validation.

The lantern store is in-memory and resets when the server restarts. Swap it for
a database when persistence is required.
