import { describe, expect, it } from "vitest";
import { pageHead, publicPaths } from "./seo";
import { headTags, llmsTxt, sitemapXml } from "./seo-files";

describe("search metadata", () => {
  it("gives every public page its own title and description", () => {
    const heads = publicPaths.map((path) => pageHead(path));
    expect(heads.every(Boolean)).toBe(true);
    expect(new Set(heads.map((head) => head!.title)).size).toBe(
      publicPaths.length,
    );
    expect(new Set(heads.map((head) => head!.description)).size).toBe(
      publicPaths.length,
    );
  });

  it("lists every public page in the sitemap and llms.txt", () => {
    const sitemap = sitemapXml();
    const llms = llmsTxt();
    for (const path of publicPaths) {
      expect(sitemap).toContain(
        `<loc>https://alarifgeneralhospital.com${path}</loc>`,
      );
      expect(llms).toContain(`(https://alarifgeneralhospital.com${path})`);
    }
  });

  it("writes valid JSON-LD into each page head", () => {
    for (const path of publicPaths) {
      const blocks = [
        ...headTags(path).matchAll(
          /<script type="application\/ld\+json">(.*?)<\/script>/g,
        ),
      ];
      expect(blocks.length).toBeGreaterThanOrEqual(2);
      for (const [, json] of blocks)
        expect(() => JSON.parse(json)).not.toThrow();
    }
  });

  it("keeps titles and descriptions short enough to show in full", () => {
    for (const path of publicPaths) {
      expect(pageHead(path)!.title.length).toBeLessThanOrEqual(75);
      expect(pageHead(path)!.description.length).toBeLessThanOrEqual(160);
    }
  });

  const jsonLd = (path: string) =>
    [
      ...headTags(path).matchAll(
        /<script type="application\/ld\+json">(.*?)<\/script>/g,
      ),
    ].map(([, json]) => JSON.parse(json));

  it("places each care page under its wing and lists each hub's pages", () => {
    const crumbs = (path: string) =>
      jsonLd(path)
        .find((block) => block["@type"] === "BreadcrumbList")
        .itemListElement.map((item: { item: string }) =>
          item.item.replace(/^https:\/\/[^/]+/, ""),
        );
    expect(crumbs("/site/services/hijama")).toEqual([
      "/site",
      "/site/unani",
      "/site/services/hijama",
    ]);
    expect(crumbs("/site/services/general-surgery")[1]).toBe("/site/general");

    for (const path of [
      "/site/general",
      "/site/unani",
      "/site/services",
      "/site/doctors",
      "/site/stories",
    ]) {
      const urls = jsonLd(path)
        .find((block) => block.mainEntity?.["@type"] === "ItemList")
        .mainEntity.itemListElement.map((item: { url: string }) => item.url);
      expect(urls.length).toBeGreaterThan(0);
      expect(new Set(urls).size).toBe(urls.length);
    }
  });
});
