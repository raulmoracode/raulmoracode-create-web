import { useCallback, useEffect, useState } from "react";
import {
  COMMANDS,
  FORK_STEPS,
  OPINIONS,
  REQUIREMENTS,
  STACK,
} from "../content";
import { cn } from "../lib/utils";

export type CardId = "inside" | "opinions" | "yours" | "reference";

function CardBody({ id }: { id: CardId }) {
  if (id === "inside") {
    return (
      <div>
        <p className="leading-relaxed">
          From @raulmoracode/create 1.0.8. Every version below is pinned exact,
          no ranges.
        </p>
        <table className="mt-4 w-full border-t border-ink/15 text-left text-sm">
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
      </div>
    );
  }

  if (id === "opinions") {
    return (
      <div>
        <p className="leading-relaxed">
          Workshop rules. Each one removes a decision from daily work.
        </p>
        <ol className="mt-4 list-decimal space-y-4 border-t border-ink/15 pl-5 pt-4 text-sm">
          {OPINIONS.map((opinion) => (
            <li key={opinion.rule} className="pl-2">
              <p className="font-medium">{opinion.rule}</p>
              <p className="mt-1 opacity-70">{opinion.why}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (id === "yours") {
    return (
      <div>
        <p className="leading-relaxed">
          Fork-first. This is an internal tool built to taste, not a fixed
          preset. Keep what fits, change the rest, keep upstream reachable.
        </p>
        <ol className="mt-4 list-decimal space-y-4 border-t border-ink/15 pl-5 pt-4 text-sm">
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
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-widest opacity-70">
        Requirements
      </h3>
      <ul className="mt-3 divide-y divide-ink/15 border-t border-ink/15 text-sm">
        {REQUIREMENTS.map((req) => (
          <li key={req} className="py-2.5 font-mono text-[13px]">
            {req}
          </li>
        ))}
      </ul>
      <h3 className="mt-8 font-mono text-xs uppercase tracking-widest opacity-70">
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
    </div>
  );
}

/**
 * Manual cards 02-05: a full-width detail panel rendered below the feature
 * prose in App.tsx, which owns the open state and opens a card on click.
 * Fully controlled through openId and onOpenChange, with internal state as a
 * fallback when left uncontrolled. Escape closes the open card. With nothing
 * open the panel collapses to zero height, is inert and aria-hidden, and a
 * short hint paragraph is shown instead.
 */
interface ManualCardsProps {
  className?: string;
  openId?: CardId | null;
  onOpenChange?: (id: CardId | null) => void;
}

export function ManualCards({
  className,
  openId: controlledOpenId,
  onOpenChange,
}: ManualCardsProps = {}) {
  const [internalOpenId, setInternalOpenId] = useState<CardId | null>(null);

  const openId =
    controlledOpenId !== undefined ? controlledOpenId : internalOpenId;

  const close = useCallback(() => {
    if (onOpenChange) {
      onOpenChange(null);
    } else {
      setInternalOpenId(null);
    }
  }, [onOpenChange]);

  useEffect(() => {
    if (!openId) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [openId, close]);

  return (
    <div data-testid="manual-cards" className={cn("pt-4 pb-8", className)}>
      {!openId && (
        <p className="feature-hint mb-4 border border-dashed border-ink/15 px-5 py-6 text-center font-mono text-xs tracking-widest opacity-70">
          Select a <span className="font-bold">feature</span> to read the
          details
        </p>
      )}

      <div
        data-testid="feature-detail"
        className={cn("grid", openId ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden">
          <section
            id="feature-panel"
            aria-hidden={!openId}
            inert={!openId}
            className={cn(
              "scroll-mt-4 border border-ink/15 bg-paper px-5 py-6 text-sm leading-relaxed sm:px-8 sm:py-8",
              !openId && "invisible",
            )}
          >
            {openId && (
              <div key={openId}>
                <CardBody id={openId} />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
