# Personal Garden

一个面向长期积累的个人数字花园：记录日常，沉淀对中国、AI、国际政治经济、生活与工作的理解，并逐步形成可公开传播的个人知识系统。

## Stack

- `web/`: Next.js App Router
- `studio/`: Standalone Sanity Studio
- Hosting: Vercel
- CMS: Sanity
- Agent workflow: `AGENTS.md`, `CLAUDE.md`, `vercel-labs/skills`, `no-mistakes`

## Manual Setup

Prerequisites:

- Node.js 22 LTS or newer
- pnpm via Corepack
- A Sanity account/project
- A Vercel account

Enable pnpm:

```bash
corepack enable
```

Install dependencies:

```bash
pnpm install
```

Create or connect a Sanity project, then copy the example env files:

```bash
cp web/.env.local.example web/.env.local
cp studio/.env.example studio/.env
```

Fill in:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_API_READ_TOKEN` if using draft mode or Live Content API

Run locally:

```bash
pnpm dev:web
pnpm dev:studio
```

Typical local URLs:

- Web: `http://localhost:3000`
- Studio: `http://localhost:3333`

## Useful Commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm typegen
```

Add Sanity CORS origins after you know the project id:

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://your-domain.com --credentials
```

Install agent skills manually:

```bash
npx skills add vercel-labs/agent-skills --agent codex --agent claude-code
```

Install no-mistakes:

```bash
curl -fsSL https://raw.githubusercontent.com/kunchenguid/no-mistakes/main/docs/install.sh | sh
```

Initialize no-mistakes after the repository is in git:

```bash
no-mistakes init
```

Push through the gate after committing on a feature branch:

```bash
git push no-mistakes
```
