// Server entry used at build time to prerender each public route to static HTML.
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Shell } from "./multipage/Website";

export { publicPaths } from "./seo";
export { headTags, llmsFullTxt, llmsTxt, sitemapXml } from "./seo-files";

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Shell />
      </StaticRouter>
    </StrictMode>,
  );
}
