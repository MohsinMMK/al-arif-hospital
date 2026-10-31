import { describe, expect, it } from "vitest";
import { splitRollingValue } from "./motion-ui";
import type { RollingPart } from "./motion-ui";

const digit = (value: number): RollingPart => ({ type: "digit", digit: value });
const text = (value: string): RollingPart => ({ type: "text", text: value });

describe("splitRollingValue", () => {
  it("splits plain numbers into digits", () => {
    expect(splitRollingValue("100")).toEqual([digit(1), digit(0), digit(0)]);
    expect(splitRollingValue("88")).toEqual([digit(8), digit(8)]);
  });

  it("keeps suffixes as static text", () => {
    expect(splitRollingValue("200+")).toEqual([
      digit(2),
      digit(0),
      digit(0),
      text("+"),
    ]);
    expect(splitRollingValue("25+")).toEqual([digit(2), digit(5), text("+")]);
    expect(splitRollingValue("427+")).toEqual([
      digit(4),
      digit(2),
      digit(7),
      text("+"),
    ]);
  });

  it("keeps decimal points between digits", () => {
    expect(splitRollingValue("5.35")).toEqual([
      digit(5),
      text("."),
      digit(3),
      digit(5),
    ]);
  });

  it("keeps prefixes and multi-byte symbols whole", () => {
    expect(splitRollingValue("₹10")).toEqual([text("₹"), digit(1), digit(0)]);
  });

  it("merges consecutive text characters", () => {
    expect(splitRollingValue("24/7 care")).toEqual([
      digit(2),
      digit(4),
      text("/"),
      digit(7),
      text(" care"),
    ]);
    expect(splitRollingValue("Rs. 1,200")).toEqual([
      text("Rs. "),
      digit(1),
      text(","),
      digit(2),
      digit(0),
      digit(0),
    ]);
  });

  it("returns nothing for an empty value", () => {
    expect(splitRollingValue("")).toEqual([]);
  });

  it("round-trips back to the original string", () => {
    for (const value of ["100", "200+", "25+", "5.35", "88", "427+", "₹10"]) {
      const joined = splitRollingValue(value)
        .map((part) => (part.type === "digit" ? String(part.digit) : part.text))
        .join("");
      expect(joined).toBe(value);
    }
  });
});
