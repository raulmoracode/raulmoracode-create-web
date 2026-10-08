import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PipelineDrawing } from "../components/pipeline-drawing";

afterEach(cleanup);

describe("PipelineDrawing", () => {
  it("renders the four station labels", () => {
    render(<PipelineDrawing />);
    expect(
      screen.getByRole("img", { name: /scaffolder steps/i }),
    ).toBeDefined();
    for (const label of [
      "01",
      "02",
      "03",
      "04",
      "technology",
      "dependencies",
      "name",
      "github",
    ]) {
      expect(screen.getByText(label)).toBeDefined();
    }
  });

  it("shows stations without caption clutter", () => {
    render(<PipelineDrawing />);
    expect(screen.queryByText("create-vite@9.2.1")).toBeNull();
    expect(screen.queryByText("create-next-app@16.3.6")).toBeNull();
    expect(screen.queryByText("never --force")).toBeNull();
  });
});
