import { PartOfRaulmoracode } from "./components/part-of-raulmoracode";
import { PipelineDrawing } from "./components/pipeline-drawing";
import { site } from "./config/site";
import { COMMANDS, FORK_STEPS, OPINIONS, REQUIREMENTS, STACK } from "./content";

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
          <PartOfRaulmoracode project="create" highlightColor="#118C4F" />
          <h1
            id="colophon"
            className="mt-6 text-3xl font-semibold text-balance"
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

        <section id="inside" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            02 — What lands in a new project
          </h2>
          <p className="mt-2 leading-relaxed">
            From @raulmoracode/create 1.0.8. Every version below is pinned
            exact, no ranges.
          </p>
          <table className="mt-6 w-full border-t border-ink/15 text-left text-sm">
            <thead>
              <tr className="font-mono text-xs uppercase tracking-widest opacity-70">
                <th scope="col" className="py-3 pr-4 font-medium">
                  Package
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  Version
                </th>
                <th scope="col" className="py-3 font-medium">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/15">
              {STACK.map((row) => (
                <tr key={row.dep}>
                  <td className="py-3 pr-4 font-medium">{row.dep}</td>
                  <td className="py-3 pr-4 font-mono text-[13px]">
                    {row.version}
                  </td>
                  <td className="py-3 opacity-70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="opinions" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            03 — Opinions, kept fixed
          </h2>
          <p className="mt-2 leading-relaxed">
            Workshop rules. Each one removes a decision from daily work.
          </p>
          <ol className="mt-6 list-decimal space-y-4 border-t border-ink/15 pl-5 pt-6 text-sm">
            {OPINIONS.map((opinion) => (
              <li key={opinion.rule} className="pl-2">
                <p className="font-medium">{opinion.rule}</p>
                <p className="mt-1 opacity-70">{opinion.why}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="yours" className="border-b border-ink/15 py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            04 — Make it yours
          </h2>
          <p className="mt-2 leading-relaxed">
            Fork-first. This is an internal tool built to taste, not a fixed
            preset. Keep what fits, change the rest, keep upstream reachable.
          </p>
          <ol className="mt-6 list-decimal space-y-4 border-t border-ink/15 pl-5 pt-6 text-sm">
            {FORK_STEPS.map((step, index) => (
              <li key={step.title} className="pl-2">
                <p className="font-medium">
                  <span className="mr-2 font-mono text-xs opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </p>
                <p className="mt-1 opacity-70">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="reference" className="py-8">
          <h2 className="font-mono text-sm uppercase tracking-widest">
            05 — Reference ledger
          </h2>
          <h3 className="mt-6 font-mono text-xs uppercase tracking-widest opacity-70">
            Requirements
          </h3>
          <ul className="mt-3 divide-y divide-ink/15 border-t border-ink/15 text-sm">
            {REQUIREMENTS.map((req) => (
              <li key={req} className="py-2.5 font-mono text-[13px]">
                {req}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-mono text-xs uppercase tracking-widest opacity-70">
            Commands
          </h3>
          <dl className="mt-3 divide-y divide-ink/15 border-t border-ink/15 text-sm">
            {COMMANDS.map((command) => (
              <div key={command.cmd} className="py-3">
                <dt className="opacity-70">{command.label}</dt>
                <dd className="mt-1 font-mono text-[13px]">{command.cmd}</dd>
              </div>
            ))}
          </dl>
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
