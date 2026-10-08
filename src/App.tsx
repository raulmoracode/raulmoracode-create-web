import { site } from "./config/site";

const npmUrl = "https://www.npmjs.com/package/@raulmoracode/create";

function App() {
  return (
    <div className="blueprint-grid min-h-screen bg-paper text-ink">
      <header className="border-b border-ink/15">
        <p className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3 font-mono text-xs uppercase tracking-widest">
          <span>FILE 001</span>
          <span>v1.0.8</span>
          <span>internal tooling</span>
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">
        <section
          aria-labelledby="colophon"
          className="border-b border-ink/15 py-10"
        >
          <p className="stamp inline-block px-3 py-1 font-mono text-xs uppercase tracking-widest">
            Colophon
          </p>
          <h1
            id="colophon"
            className="mt-4 text-3xl font-semibold text-balance"
          >
            An internal tool, kept in the open
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed">
            This CLI is built to the author&apos;s taste for starting React +
            Vite and Next.js projects. Anyone can fork it and make their own
            version. There are no support promises — use it as-is and adapt what
            you need.
          </p>
        </section>

        <section id="run" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">Run</h2>
          <p className="mt-2 leading-relaxed">
            Run one command with Node 24 and pnpm 12.6.0 to scaffold a React +
            Vite or Next.js project.
          </p>
        </section>

        <section id="inside" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            Inside
          </h2>
          <p className="mt-2 leading-relaxed">
            Each scaffold ships with Tailwind CSS 4.3.3, shadcn, Biome 2.5.14,
            and Vitest 5.0.2 configured the same way.
          </p>
        </section>

        <section id="opinions" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            Opinions
          </h2>
          <p className="mt-2 leading-relaxed">
            Defaults stay fixed and opinionated so formatting, linting, and
            testing behave identically in every new project.
          </p>
        </section>

        <section id="yours" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">Yours</h2>
          <p className="mt-2 leading-relaxed">
            Fork the repository and change any default to match your own taste,
            with no permission or support ticket needed.
          </p>
        </section>

        <section id="reference" className="py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            Reference
          </h2>
          <p className="mt-2 leading-relaxed">
            The reference lists commands, flags, and exact stack versions so
            this file stays the source of truth.
          </p>
        </section>
      </main>

      <footer className="border-t border-ink/15">
        <p className="mx-auto max-w-3xl px-6 py-6 text-sm leading-relaxed">
          MIT — {site.author} —{" "}
          <a href={site.url} className="underline underline-offset-4">
            repo
          </a>{" "}
          ·{" "}
          <a href={npmUrl} className="underline underline-offset-4">
            npm
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
