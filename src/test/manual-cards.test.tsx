import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ManualCards } from "../components/manual-cards";

afterEach(cleanup);

describe("ManualCards", () => {
  it("renders with hidden panel when openId is null", () => {
    render(<ManualCards openId={null} />);
    const panel = document.getElementById("feature-panel");
    expect(panel?.tagName).toBe("SECTION");
    expect(panel?.getAttribute("aria-hidden")).toBe("true");
    expect(panel?.classList.contains("invisible")).toBe(true);
    expect(
      screen.getByText((content, element) => {
        const hasText = (el: Element) =>
          el.textContent === "Select a feature to read the details";
        return element?.tagName.toLowerCase() === "p" && hasText(element);
      }),
    ).toBeDefined();
  });

  it("shows opinions content when openId is opinions", () => {
    render(<ManualCards openId="opinions" />);
    const panel = document.getElementById("feature-panel");
    expect(panel?.getAttribute("aria-hidden")).toBe("false");
    expect(panel?.classList.contains("invisible")).toBe(false);
    expect(screen.getByText(/Workshop rules/)).toBeDefined();
    expect(screen.getByText("pnpm only, exact versions.")).toBeDefined();
    expect(
      screen.queryByText((content, element) => {
        const hasText = (el: Element) =>
          el.textContent === "Select a feature to read the details";
        return element?.tagName.toLowerCase() === "p" && hasText(element);
      }),
    ).toBeNull();
  });

  it("switches content when openId changes", () => {
    const { rerender } = render(<ManualCards openId="opinions" />);
    expect(screen.getByText(/Workshop rules/)).toBeDefined();
    expect(screen.queryByText(/Fork-first/)).toBeNull();

    rerender(<ManualCards openId="yours" />);
    expect(screen.getByText(/Fork-first/)).toBeDefined();
    expect(screen.queryByText(/Workshop rules/)).toBeNull();
  });

  it("closes panel on escape key", () => {
    const onOpenChange = vi.fn();
    render(<ManualCards openId="inside" onOpenChange={onOpenChange} />);

    expect(screen.getByText(/From @raulmoracode\/create/)).toBeDefined();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(null);
  });
});
