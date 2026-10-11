import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { InstallTrigger } from "../components/install-trigger";
import { INSTALL_COMMAND } from "../content";

afterEach(cleanup);

describe("InstallTrigger", () => {
  it("renders the prompt with the install command styling", () => {
    render(<InstallTrigger />);
    const button = screen.getByRole("button", {
      name: "Copy the install command",
    });
    expect(button.className).toContain("text-brand");
    expect(button.className).toContain("underline");
  });

  it("copies the install command and confirms it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(<InstallTrigger />);
    fireEvent.click(
      screen.getByRole("button", { name: "Copy the install command" }),
    );

    expect(writeText).toHaveBeenCalledWith(INSTALL_COMMAND);
    expect(
      await screen.findByRole("button", { name: "Copied!" }),
    ).toBeDefined();
  });
});
