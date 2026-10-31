// After a deploy, tells IndexNow search engines (Bing, Yandex and others) that every page in the
// sitemap may have changed, so they recrawl without waiting. The key file in public/ proves we own the site.
import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "../dist");
const keyFile = (await readdir(dist)).find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error("No IndexNow key file in dist");

const key = keyFile.slice(0, -4);
const urlList = [...(await readFile(resolve(dist, "sitemap.xml"), "utf8")).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const { host, origin } = new URL(urlList[0]);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `${origin}/${keyFile}`, urlList }),
});
// 200 means accepted; 202 means accepted while the key file is still being checked.
if (!response.ok) throw new Error(`IndexNow answered ${response.status}: ${await response.text()}`);
console.log(`IndexNow accepted ${urlList.length} URLs (${response.status})`);
