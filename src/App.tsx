import { PipelineDrawing } from "./components/pipeline-drawing";
import { COMMANDS, FORK_STEPS, OPINIONS, REQUIREMENTS, STACK } from "./content";

function App() {
  return (
    <div className="blueprint-grid min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-3xl px-6 pb-16">
        <section aria-labelledby="colophon" className="pt-24">
          <h1 id="colophon" className="text-3xl font-semibold text-balance">
            An internal tool, kept in the open
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed">
            My internal scaffolding tool: one command, the same stack every
            time. Follow a run in the drawing and read the ledger below. Built
            to my taste — fork it and shape your own. No support promises.
          </p>
        </section>

        <section id="run" className="pb-8 pt-4">
          <div>
            <PipelineDrawing />
          </div>
        </section>

        <section id="inside" className="py-8">
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

        <section id="opinions" className="py-8">
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

        <section id="yours" className="py-8">
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
    </div>
  );
}

export default App;
