import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PartOfRaulmoracode } from "../components/part-of-raulmoracode";

describe("PartOfRaulmoracode", () => {
  it("links to raulmoracode.com", () => {
    render(<PartOfRaulmoracode project="create" highlightColor="#1c1917" />);
    const link = screen.getByRole("link", {
      name: /create — part of raulmoracode ecosystem/i,
    });
    expect(link.getAttribute("href")).toBe("https://raulmoracode.com");
  });
});
