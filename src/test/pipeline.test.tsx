import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PipelineDrawing } from "../components/pipeline-drawing";

afterEach(cleanup);

describe("PipelineDrawing", () => {
  it("renders the four station labels", () => {
    render(<PipelineDrawing />);
    expect(screen.getByRole("img", { name: /cli pipeline/i })).toBeDefined();
    for (const label of [
      "01",
      "02",
      "03",
      "04",
      "ask",
      "scaffold",
      "configure",
      "land",
    ]) {
      expect(screen.getByText(label)).toBeDefined();
    }
  });

  it("encodes the pinned generator versions and the never-force rule", () => {
    render(<PipelineDrawing />);
    expect(screen.getByText("create-vite@9.2.1")).toBeDefined();
    expect(screen.getByText("create-next-app@16.3.6")).toBeDefined();
    expect(screen.getByText("never --force")).toBeDefined();
  });
});
