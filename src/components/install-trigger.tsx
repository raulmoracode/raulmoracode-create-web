import { useCallback, useEffect, useRef, useState } from "react";
import { INSTALL_COMMAND } from "../content";
import { cn } from "../lib/utils";

interface InstallTriggerProps {
  className?: string;
}

/**
 * Inline link that copies the install command to the clipboard and confirms
 * it in place. Styled like the surrounding prose triggers and always green,
 * so it reads as an action rather than as a link that has to be discovered.
 */
export function InstallTrigger({ className }: InstallTriggerProps = {}) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(timeout.current);
    },
    [],
  );

  const copyCommand = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_COMMAND);
      setCopied(true);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        setCopied(false);
      }, 2400);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <button
      type="button"
      onClick={copyCommand}
      className={cn(
        "cursor-pointer text-brand underline decoration-solid decoration-brand underline-offset-4",
        className,
      )}
    >
      <span aria-live="polite">
        {copied ? "Copied!" : "Copy the install command"}
      </span>
    </button>
  );
}
