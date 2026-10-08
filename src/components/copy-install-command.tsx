"use client";

import { Copy, CopyCheck } from "@raulmoracode/icons";
import { useState } from "react";

import { cn } from "../lib/utils";

interface CopyInstallCommandProps {
  command: string;
  className?: string;
}

export function CopyInstallCommand({
  command,
  className,
}: CopyInstallCommandProps) {
  const [copiedCommand, setCopiedCommand] = useState(false);

  const commandParts = command.split("/");
  const commandSegments = commandParts.map((part, index, parts) => ({
    key: parts.slice(0, index + 1).join("/"),
    part,
    isFirst: index === 0,
    isLast: index === parts.length - 1,
  }));

  const copyInstallCommand = async () => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(true);

      window.setTimeout(() => {
        setCopiedCommand(false);
      }, 1600);
    } catch {
      setCopiedCommand(false);
    }
  };

  return (
    <div className="landing-install-command mt-4">
      <button
        type="button"
        aria-label={`Copy install command: ${command}`}
        className={cn(
          "group flex min-h-11 w-full max-w-xl items-start gap-2",
          "rounded-3xl border border-border bg-paper",
          "px-3 py-2.5 text-left",
          "font-mono text-xs tracking-[0.5px]",
          "text-muted-foreground",
          "transition-all duration-200",
          "hover:border-foreground/20 hover:shadow-sm",
          "sm:w-auto sm:items-center sm:overflow-hidden sm:text-sm",
          className,
        )}
        onClick={copyInstallCommand}
      >
        <span className="shrink-0 text-[#118C4F]" aria-hidden="true">
          $
        </span>

        <code
          className={cn(
            "wrap-break-word min-w-0 flex-1",
            "whitespace-normal text-foreground/80",
            "sm:flex-none sm:truncate sm:whitespace-nowrap",
          )}
        >
          {commandSegments.map((segment) => (
            <span key={segment.key}>
              {segment.isFirst ? null : "/"}
              {segment.part}
              {segment.isLast ? null : <wbr />}
            </span>
          ))}
        </code>

        <span
          className={cn(
            "ml-auto inline-flex shrink-0 items-center gap-1.5",
            "border-border/70 border-l pl-3",
            "font-medium font-sans text-xs",
            "text-foreground/70",
            "transition-all duration-200",
            "group-hover:border-foreground/15",
            "group-hover:text-foreground",
          )}
          aria-hidden="true"
        >
          {copiedCommand ? (
            <CopyCheck className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}

          <span>{copiedCommand ? "Copied!" : "Copy"}</span>
        </span>
      </button>
    </div>
  );
}
