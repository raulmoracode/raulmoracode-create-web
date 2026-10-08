export interface StackRow {
  dep: string;
  version: string;
  note: string;
}

export interface CommandRow {
  label: string;
  cmd: string;
}

export interface Opinion {
  rule: string;
  why: string;
}

export interface ForkStep {
  title: string;
  detail: string;
}

export const STACK: StackRow[] = [
  {
    dep: "Node.js",
    version: ">=24",
    note: "runtime baseline, matches engines and .nvmrc",
  },
  {
    dep: "pnpm",
    version: "12.6.0",
    note: "exclusive package manager, exact pins only",
  },
  { dep: "React", version: "19.3.0", note: "UI runtime" },
  {
    dep: "React DOM",
    version: "19.3.0",
    note: "DOM renderer, pinned with React",
  },
  { dep: "Vite", version: "8.3.1", note: "dev server and production build" },
  {
    dep: "TypeScript",
    version: "7.0.2",
    note: "strict types, project references",
  },
  {
    dep: "Tailwind CSS",
    version: "4.3.3",
    note: "CSS-first, tokens in CSS",
  },
  { dep: "Biome", version: "2.5.14", note: "sole formatter and linter" },
  { dep: "Vitest", version: "5.0.2", note: "unit tests with jsdom 30.1.1" },
  {
    dep: "Testing Library",
    version: "16.3.3 / 10.4.2",
    note: "react 16.3.3, dom 10.4.2",
  },
  {
    dep: "Husky",
    version: "9.1.7",
    note: "pre-commit and commit-msg hooks",
  },
  {
    dep: "Commitlint",
    version: "21.2.3",
    note: "conventional commits",
  },
  {
    dep: "shadcn",
    version: "4.21.0",
    note: "via dlx, registry raulmoracode",
  },
];

export const REQUIREMENTS: string[] = [
  "Node 24",
  "pnpm 12",
  "git identity configured",
  "empty GitHub repository",
  "gh authenticated",
];

export const COMMANDS: CommandRow[] = [
  { label: "Install globally", cmd: "npm i -g @raulmoracode/create" },
  { label: "Scaffold", cmd: "raulmoracode-create" },
  { label: "Verbose output", cmd: "raulmoracode-create --verbose" },
  { label: "Help", cmd: "raulmoracode-create --help" },
  { label: "Version", cmd: "raulmoracode-create --version" },
  { label: "Dev server", cmd: "pnpm dev" },
  { label: "Production build", cmd: "pnpm build" },
  { label: "Format and lint check", cmd: "pnpm check" },
  { label: "Apply formatting", cmd: "pnpm format" },
  { label: "Lint", cmd: "pnpm lint" },
  { label: "Tests, watch mode", cmd: "pnpm test" },
  { label: "Tests, single run", cmd: "CI=true pnpm test" },
  {
    label: "Add UI component",
    cmd: "pnpm dlx shadcn@4.21.0 add @raulmoracode/<component>",
  },
  {
    label: "Upgrade scaffold",
    cmd: "pnpm dlx @raulmoracode/create@latest upgrade",
  },
];

export const OPINIONS: Opinion[] = [
  {
    rule: "pnpm only, exact versions.",
    why: "One lockfile, no range drift between machines.",
  },
  {
    rule: "Biome is the only formatter and linter.",
    why: "No ESLint or Prettier overlap to reconcile.",
  },
  {
    rule: "Site identity lives in src/config/site.ts.",
    why: "Title, description, and social preview change in one place.",
  },
  {
    rule: "shadcn-ready with cn() from the start.",
    why: "components.json plus clsx and tailwind-merge.",
  },
  {
    rule: "Tailwind CSS-first.",
    why: "Tokens live in CSS, no config-layer theming.",
  },
  {
    rule: "Conventional Commits enforced by hooks.",
    why: "Husky plus commitlint keeps history readable.",
  },
  {
    rule: "Upgrades open a ready PR, history stays linear.",
    why: "Review the diff, never rewrite with --force.",
  },
];

export const FORK_STEPS: ForkStep[] = [
  {
    title: "Fork the repository.",
    detail: "Keep the template as upstream so upgrades still apply.",
  },
  {
    title: "Edit src/config/site.ts first.",
    detail: "Rename identity before touching layout or styles.",
  },
  {
    title: "Adjust pins to your policy.",
    detail: "Keep exact versions or record each exception.",
  },
  {
    title: "Keep the manifest and upgrade path.",
    detail: "Do not remove the upgrade script until you own it.",
  },
  {
    title: "Publish yours.",
    detail: "Treat it as an internal tool built to your taste.",
  },
];
