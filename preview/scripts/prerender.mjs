// Writes a static HTML file for every public route so search engines and AI assistants that
// don't run JavaScript still read each page, then adds sitemap.xml, llms.txt and llms-full.txt.
// Pages go under dist/prerendered/ so no real folder shadows a route; .htaccess maps URLs onto them.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const server = await import(resolve(root, "dist-ssr/entry-server.js"));

// Just enough browser surface for components that read it while rendering. Set after the import
// so libraries that register at load time (gsap) still see a server environment.
const media = { matches: false, addEventListener() {}, removeEventListener() {} };
globalThis.window = { matchMedia: () => media };
globalThis.document = { hidden: false };

const template = await readFile(resolve(dist, "index.html"), "utf8");
const defaultHead = /<title>[\s\S]*?<\/title>\s*<meta\s+name="description"[\s\S]*?\/>/;
if (!defaultHead.test(template)) throw new Error("index.html no longer has the expected title and description");

for (const path of server.publicPaths) {
  const html = template
    .replace(defaultHead, () => server.headTags(path))
    .replace('<div id="root"></div>', () => `<div id="root">${server.render(path)}</div>`);
  const file = resolve(dist, `prerendered${path}/index.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

// index.html now only answers unknown paths (the app shows its not-found page), so keep it out of search.
await writeFile(
  resolve(dist, "index.html"),
  template.replace("<head>", '<head>\n    <meta name="robots" content="noindex" />'),
);
await writeFile(resolve(dist, "sitemap.xml"), server.sitemapXml());
await writeFile(resolve(dist, "llms.txt"), server.llmsTxt());
await writeFile(resolve(dist, "llms-full.txt"), server.llmsFullTxt());
console.log(`Prerendered ${server.publicPaths.length} pages, sitemap.xml, llms.txt and llms-full.txt`);
