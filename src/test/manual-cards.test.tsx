import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ManualCards } from "../components/manual-cards";

afterEach(cleanup);

describe("ManualCards", () => {
  it("renders four cards with toggles", () => {
    render(<ManualCards />);
    const buttons = screen.getAllByRole("button", { expanded: false });
    expect(buttons).toHaveLength(4);
    for (const title of [
      "What lands in a new project",
      "Opinions, kept fixed",
      "Make it yours",
      "Reference ledger",
    ]) {
      expect(screen.getByText(title)).toBeDefined();
    }
  });

  it("toggles a card open on click", () => {
    render(<ManualCards />);
    const button = screen.getByRole("button", {
      name: /Opinions, kept fixed/,
    });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("pnpm only, exact versions.")).toBeDefined();
  });
});
