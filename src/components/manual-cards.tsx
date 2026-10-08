import { useState } from "react";
import {
  COMMANDS,
  FORK_STEPS,
  OPINIONS,
  REQUIREMENTS,
  STACK,
} from "../content";
import { cn } from "../lib/utils";

type CardId = "inside" | "opinions" | "yours" | "reference";

const CARDS: { id: CardId; number: string; title: string }[] = [
  { id: "inside", number: "02", title: "What lands in a new project" },
  { id: "opinions", number: "03", title: "Opinions, kept fixed" },
  { id: "yours", number: "04", title: "Make it yours" },
  { id: "reference", number: "05", title: "Reference ledger" },
];

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

export function ManualCards({ className }: { className?: string }) {
  const [openId, setOpenId] = useState<CardId | null>(null);

  return (
    <div className={cn("grid gap-4 py-8 md:grid-cols-2", className)}>
      {CARDS.map((card) => {
        const open = openId === card.id;
        return (
          <div
            key={card.id}
            id={card.id}
            data-open={open}
            className="group scroll-mt-4 border border-ink/15 bg-paper"
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${card.id}-body`}
              onClick={() => setOpenId(open ? null : card.id)}
              className="flex w-full items-baseline gap-3 px-5 py-4 text-left"
            >
              <span className="font-mono text-xs tracking-widest opacity-70">
                {card.number}
              </span>
              <span className="block min-w-0 flex-1 font-medium leading-snug">
                {card.title}
              </span>
              <span
                aria-hidden="true"
                className="plus shrink-0 font-mono text-lg leading-none opacity-70"
              >
                +
              </span>
            </button>
            <div id={`${card.id}-body`} className="reveal px-5">
              <div className="min-h-0">
                <div className="border-t border-ink/15 py-4 text-sm leading-relaxed">
                  <CardBody id={card.id} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
