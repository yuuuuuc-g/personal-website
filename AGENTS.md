# Personal Garden Agent Memory

## Project Intent

Build a long-running personal website that acts as a public knowledge garden and personal archive. The site should help the author record daily life, study China, AI, international political economy, work, writing, and personal growth, then gradually turn selected ideas into public influence.

## Architecture

- Use a monorepo with `web/` and `studio/`.
- `web/` is a Next.js App Router application.
- `studio/` is a standalone Sanity Studio. Do not embed Studio into the Next.js app.
- Sanity is the source of truth for public content.
- Vercel hosts the web frontend.

## Content Principles

- Model content by meaning, not layout.
- Prefer references for reusable knowledge objects.
- Let Sanity generate ordinary document `_id` values.
- Keep forward links explicit and compute backlinks from references.
- Store taxonomy as `topic` documents, not loose strings, when the taxonomy matters.

## Core Content Types

- `note`: working digital-garden notes with `seed`, `sapling`, or `evergreen` status.
- `essay`: polished public writing.
- `topic`: durable subject hubs such as China, AI, local finance, or international order.
- `journal`: daily, weekly, monthly, or annual logs.
- `source`: books, papers, reports, articles, podcasts, videos, datasets, and other references.
- `siteSettings`: singleton-style site configuration.

## Editorial Status

- `seed`: early idea, fragment, question, or reading note.
- `sapling`: developed note with evidence, structure, and links.
- `evergreen`: mature, maintained, and worth sending to others.

Use `visibility` separately:

- `private`: not intended for public rendering.
- `unlisted`: accessible if linked, but not listed.
- `public`: visible in public indexes and feeds.

## Development Rules

- Keep schema fields semantic.
- Use `defineType`, `defineField`, and `defineArrayMember` in Sanity schemas.
- Use `defineQuery` for GROQ queries.
- Include `_key` when projecting arrays.
- Keep homepage useful as a knowledge map, not a landing page.
- Avoid marketing copy unless it clarifies the author's current inquiry.

## Validation

Before a PR or deployment:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Use `no-mistakes` as the final local gate once it is initialized.
