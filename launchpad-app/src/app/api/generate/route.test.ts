import { describe, it, expect } from "vitest";
import { POST } from "./route";

describe("Generate Route", () => {
  it("exports a POST handler", () => {
    expect(POST).toBeTypeOf("function");
  });
});
