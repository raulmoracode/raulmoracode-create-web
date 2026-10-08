import { ManualCards } from "./components/manual-cards";
import { PipelineDrawing } from "./components/pipeline-drawing";
import { site } from "./config/site";

const npmUrl = "https://www.npmjs.com/package/@raulmoracode/create";
const repoUrl = "https://github.com/raulmoracode/raulmoracode-create";

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
            @raulmoracode/create scaffolds React + Vite and Next.js projects
            with Tailwind, shadcn, Biome, and Vitest. It is built to my taste
            for starting projects the same way every time. Anyone can fork it
            and shape their own version. No support promises, no roadmap to
            request from.
          </p>
          <p className="mt-3 max-w-prose font-mono text-xs leading-relaxed opacity-70">
            source: {repoUrl} · this page documents the tool, it does not sell
            it
          </p>
        </section>

        <section id="run" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            01 — A run, drawn
          </h2>
          <p className="mt-2 leading-relaxed">
            A run is four stations. The drawing below carries it, so there is no
            paragraph to decode.
          </p>
          <div className="mt-6 border border-ink/15">
            <PipelineDrawing />
          </div>
          <p className="mt-3 font-mono text-xs leading-relaxed opacity-70">
            bare command: raulmoracode-create — add --verbose to watch every
            external command
          </p>
        </section>

        <ManualCards />
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
