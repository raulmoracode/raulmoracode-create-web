import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CopyInstallCommand } from "../components/copy-install-command";

describe("CopyInstallCommand", () => {
  it("renders the install command with a copy action", () => {
    render(
      <CopyInstallCommand command="npm install -g @raulmoracode/create" />,
    );
    expect(
      screen.getByRole("button", {
        name: /copy install command: npm install -g @raulmoracode\/create/i,
      }),
    ).toBeDefined();
    expect(screen.getByText("Copy")).toBeDefined();
  });
});
