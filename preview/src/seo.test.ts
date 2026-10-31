import { describe, expect, it } from "vitest";
import { pageHead, publicPaths } from "./seo";
import { headTags, llmsTxt, sitemapXml } from "./seo-files";

describe("search metadata", () => {
  it("gives every public page its own title and description", () => {
    const heads = publicPaths.map((path) => pageHead(path));
    expect(heads.every(Boolean)).toBe(true);
    expect(new Set(heads.map((head) => head!.title)).size).toBe(publicPaths.length);
    expect(new Set(heads.map((head) => head!.description)).size).toBe(publicPaths.length);
  });

  it("lists every public page in the sitemap and llms.txt", () => {
    const sitemap = sitemapXml();
    const llms = llmsTxt();
    for (const path of publicPaths) {
      expect(sitemap).toContain(`<loc>https://alarifgeneralhospital.com${path}</loc>`);
      expect(llms).toContain(`(https://alarifgeneralhospital.com${path})`);
    }
  });

  it("writes valid JSON-LD into each page head", () => {
    for (const path of publicPaths) {
      const blocks = [...headTags(path).matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)];
      expect(blocks.length).toBeGreaterThanOrEqual(2);
      for (const [, json] of blocks) expect(() => JSON.parse(json)).not.toThrow();
    }
  });
});
