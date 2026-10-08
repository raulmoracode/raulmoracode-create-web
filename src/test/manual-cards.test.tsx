import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ManualCards } from "../components/manual-cards";

afterEach(cleanup);

describe("ManualCards", () => {
  it("renders four cards without open dialogs", () => {
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
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens the dialog on hover", () => {
    render(<ManualCards />);
    const button = screen.getByRole("button", {
      name: /Opinions, kept fixed/,
    });
    fireEvent.mouseEnter(button);
    expect(screen.getByRole("dialog")).toBeDefined();
    expect(screen.getByText("pnpm only, exact versions.")).toBeDefined();
  });

  it("closes the dialog on escape", () => {
    render(<ManualCards />);
    const button = screen.getByRole("button", {
      name: /Opinions, kept fixed/,
    });
    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeDefined();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes the dialog when leaving the panel", () => {
    render(<ManualCards />);
    const button = screen.getByRole("button", {
      name: /Make it yours/,
    });
    fireEvent.mouseEnter(button);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeDefined();
    fireEvent.mouseLeave(dialog);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes the dialog when leaving the window", () => {
    render(<ManualCards />);
    const button = screen.getByRole("button", {
      name: /Reference ledger/,
    });
    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeDefined();
    fireEvent.mouseOut(document, { relatedTarget: null });
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
