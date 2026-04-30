import { describe, it, expect } from "vitest";
import { z } from "zod";

describe("env validators", () => {
  it("should parse a valid URL", () => {
    const schema = z.object({
      NEXT_PUBLIC_SITE_URL: z.string().url(),
    });

    const validEnv = {
      NEXT_PUBLIC_SITE_URL: "https://example.com",
    };

    const result = schema.parse(validEnv);
    expect(result.NEXT_PUBLIC_SITE_URL).toBe("https://example.com");
  });

  it("should reject an invalid URL", () => {
    const schema = z.object({
      NEXT_PUBLIC_SITE_URL: z.string().url(),
    });

    const invalidEnv = {
      NEXT_PUBLIC_SITE_URL: "not-a-url",
    };

    expect(() => schema.parse(invalidEnv)).toThrow();
  });
});
