import { CopyInstallCommand } from "./components/copy-install-command";
import { ManualCards } from "./components/manual-cards";
import { PartOfRaulmoracode } from "./components/part-of-raulmoracode";
import { PipelineDrawing } from "./components/pipeline-drawing";

function App() {
  return (
    <div className="blueprint-grid min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-3xl px-6 pb-16">
        <section aria-labelledby="colophon" className="pt-24">
          <PartOfRaulmoracode project="create" highlightColor="#118C4F" />
          <h1
            id="colophon"
            className="mt-6 text-3xl font-semibold text-balance"
          >
            An internal tool, kept in the open
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed">
            My internal scaffolding tool: one command, the same stack every
            time. Follow a run in the drawing, open the cards for the details,
            and grab the install command at the bottom. Built to my taste — fork
            it and shape your own. No support promises.
          </p>
        </section>

        <section id="run" className="pb-8 pt-4">
          <div>
            <PipelineDrawing />
          </div>
        </section>

        <ManualCards />

        <div className="flex justify-center pb-4">
          <CopyInstallCommand command="npm install -g @raulmoracode/create" />
        </div>
      </main>
    </div>
  );
}

export default App;
