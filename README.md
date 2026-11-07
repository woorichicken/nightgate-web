# nightgate-web

Homepage for [Nightgate](https://github.com/woorichicken/nightgate) — https://nightgate.solhun.com

Nightgate filters what overnight coding agents ask you down to the decisions only you can make.
The product code lives in that repository. This one is only the site.

Built from an open-source landing template: every word, link, and image lives in `site.config.ts`.
Stars, contributors, and release versions are read from the GitHub API at build time.

```bash
pnpm install
cp .env.example .env.local   # DATABASE_URL, ADMIN_API_KEY
pnpm db:migrate              # drizzle-kit reads DATABASE_URL from the shell, so export it first
pnpm dev -p 3220
```

Changelog, roadmap, and feedback are stored in Postgres (Neon) and written through
key-protected API routes (`ADMIN_API_KEY`).

The demo videos are real recordings of the Nightgate console. See `scripts/demo/README.md`.

MIT
