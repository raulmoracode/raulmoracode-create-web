import { useState } from "react";
import { InstallTrigger } from "./components/install-trigger";
import type { CardId } from "./components/manual-cards";
import { ManualCards } from "./components/manual-cards";
import { PartOfRaulmoracode } from "./components/part-of-raulmoracode";

const TRIGGER =
  "cursor-pointer underline decoration-solid underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand";

function App() {
  const [openId, setOpenId] = useState<CardId | null>(null);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-3xl px-6 pb-16">
        <div className="[&:has(.feature-hint:hover)_button]:text-brand [&:has(.feature-hint:hover)_button]:decoration-brand">
          <section aria-labelledby="colophon" className="pt-24">
            <PartOfRaulmoracode
              project="create"
              highlightColor="var(--color-brand)"
            />
            <p className="mt-4 max-w-prose leading-relaxed">
              Terminal tool to start web projects faster.{" "}
              <button
                type="button"
                aria-controls="feature-panel"
                aria-expanded={openId === "yours"}
                onClick={() => setOpenId(openId === "yours" ? null : "yours")}
                className={TRIGGER}
              >
                Fork
              </button>{" "}
              it to adapt to your needs. The{" "}
              <button
                type="button"
                aria-controls="feature-panel"
                aria-expanded={openId === "inside"}
                onClick={() => setOpenId(openId === "inside" ? null : "inside")}
                className={TRIGGER}
              >
                Stack
              </button>{" "}
              comes with everything pinned exact.{" "}
              <button
                type="button"
                aria-controls="feature-panel"
                aria-expanded={openId === "opinions"}
                onClick={() =>
                  setOpenId(openId === "opinions" ? null : "opinions")
                }
                className={TRIGGER}
              >
                Opinions
              </button>{" "}
              are baked in so you don't decide. The{" "}
              <button
                type="button"
                aria-controls="feature-panel"
                aria-expanded={openId === "reference"}
                onClick={() =>
                  setOpenId(openId === "reference" ? null : "reference")
                }
                className={TRIGGER}
              >
                Reference
              </button>{" "}
              section has commands, requirements, and guides. <InstallTrigger />
            </p>
          </section>

          <ManualCards openId={openId} onOpenChange={setOpenId} />
        </div>
      </main>
    </div>
  );
}

export default App;
