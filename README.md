# raulmoracode-create-web

This is a **React + Vite** project generated with [`@raulmoracode/create`](https://github.com/raulmoracode/raulmoracode-create).

## Requirements

- **Node.js 24** — pinned in `.nvmrc` (`nvm use` picks it up automatically)
- **pnpm 12.6.0** — pinned in `package.json` (`packageManager`); never use npm or yarn in this project

## Getting started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build (`dist/`) |
| `pnpm check` | Run the formatter and linter check |
| `pnpm format` | Apply formatting |
| `pnpm lint` | Run the linter |
| `pnpm test` | Run the test suite (watch mode) |

## Tech stack

- **React 19.3.0 + Vite 8.3.1 + TypeScript 7.0.2** — exact versions, no `^` or `~`
- **Tailwind CSS 4.3.3** — CSS-first configuration (`@import "tailwindcss"` in `src/index.css`)
- **shadcn** — `components.json` + `cn()` helper (`src/lib/utils.ts`)
- **Biome 2.5.14** — formatter, linter and organize imports
- **Vitest 5.0.2 + Testing Library** — tests run in `jsdom`
- **Husky 9.1.7 + Commitlint** — Git hooks and Conventional Commits
- **VS Code** — Biome set as default formatter, format on save

## shadcn components

No components are preinstalled. Add yours from the private registry:

```bash
pnpm dlx shadcn@4.21.0 add @raulmoracode/<component>
```

Browse the catalogue at https://registry.raulmoracode.com. After adding components, normalize their style with Biome (the shadcn CLI uses its own formatting):

```bash
pnpm exec biome check --write .
```

## Git workflow

- `pre-commit` runs `pnpm check` and `pnpm test`
- `commit-msg` runs Commitlint — commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add user profile
fix: handle invalid input
```

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request:

- `pnpm install` — dependencies resolve correctly
- `pnpm check` — code is formatted and linted
- `pnpm test` — tests pass
- `pnpm build` — production build succeeds

Deployment is manual: once CI passes, deploy to your preferred hosting provider.

## Site identity

`src/config/site.ts` is the single place to change how this site presents itself:

- `title` — the browser tab title
- `description` — empty by default; filling it adds the meta description and the preview text
- `favicon` — the icon in the tab
- `socialImage` and `socialImageAlt` — the image shown when the link is shared
  (`socialImage` accepts either a local path such as `/imagen.png`, served from `public/`,
  or a full URL)
- `author`, `twitter`, `locale`, `themeColor` and `url` (the canonical URL once deployed)

Empty values are never rendered: no blank meta tag is emitted.

`favicon` also accepts a local path such as `/favicon.svg` in `public/`, or a full URL.

Crawlers cannot resolve relative URLs, so once the site is deployed set `url` and any
local `socialImage` is emitted absolute. The preview image has to be a 1200x630 PNG or
JPG (SVG is ignored by X, WhatsApp and Facebook); put it in `public/` and point
`socialImage` at it.

The `siteHead()` plugin in `vite.config.ts` injects the tags into `index.html` at build time.

Change it there and both follow: nothing has to be edited in `index.html` or `layout.tsx`.

## Project structure

```text
├── index.html            # tab title + favicon (raulmoracode branding)
├── .github/workflows/    # CI (install, check, test, build)
├── src/
│   ├── main.tsx     # entry point
│   ├── App.tsx      # root component
│   ├── index.css    # Tailwind entry point
│   ├── App.css      # root styles
│   ├── components/  # shadcn components land here
│   ├── hooks/       # registry hooks land here
│   ├── lib/         # cn() in utils.ts
│   ├── config/
│   │   └── site.ts  # site identity
│   └── test/        # smoke test
├── components.json       # shadcn config (includes the @raulmoracode registry)
├── .husky/               # Git hooks
├── commitlint.config.ts  # commit message validation
├── biome.json            # formatter + linter config
├── vitest.config.ts      # test config
├── .vscode/              # VS Code settings + extensions
├── pnpm-workspace.yaml   # minimumReleaseAge policy + excludes
├── LICENSE               # MIT license
├── CHANGELOG.md          # project changelog
└── AGENTS.md             # guidelines for AI coding agents
```

## Links

- [raulmoracode.com](https://raulmoracode.com)
- Repository: [github.com/raulmoracode/raulmoracode-create-web](https://github.com/raulmoracode/raulmoracode-create-web)
