import { defineConfig } from "vite";
import portfolioConfig from "./portfolio.config.js";

const toAbsoluteUrl = (baseUrl, assetPath) => {
  if (!baseUrl) return assetPath;
  return new URL(assetPath, `${baseUrl.replace(/\/$/, "")}/`).href;
};

const metadataTags = () => {
  const { metadata, name, portrait } = portfolioConfig;
  const socialImage = toAbsoluteUrl(metadata.siteUrl, metadata.socialImage);
  const tags = [
    { tag: "meta", attrs: { name: "description", content: metadata.description }, injectTo: "head" },
    { tag: "meta", attrs: { name: "author", content: name }, injectTo: "head" },
    { tag: "meta", attrs: { property: "og:type", content: "website" }, injectTo: "head" },
    { tag: "meta", attrs: { property: "og:title", content: metadata.browserTitle }, injectTo: "head" },
    { tag: "meta", attrs: { property: "og:description", content: metadata.description }, injectTo: "head" },
    { tag: "meta", attrs: { property: "og:image", content: socialImage }, injectTo: "head" },
    { tag: "meta", attrs: { property: "og:image:alt", content: portrait.alt }, injectTo: "head" },
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" }, injectTo: "head" },
    { tag: "meta", attrs: { name: "twitter:title", content: metadata.browserTitle }, injectTo: "head" },
    { tag: "meta", attrs: { name: "twitter:description", content: metadata.description }, injectTo: "head" },
    { tag: "meta", attrs: { name: "twitter:image", content: socialImage }, injectTo: "head" },
    { tag: "meta", attrs: { name: "twitter:image:alt", content: portrait.alt }, injectTo: "head" },
  ];

  if (metadata.siteUrl) {
    tags.push(
      { tag: "link", attrs: { rel: "canonical", href: metadata.siteUrl }, injectTo: "head" },
      { tag: "meta", attrs: { property: "og:url", content: metadata.siteUrl }, injectTo: "head" },
    );
  }

  return tags;
};

export default defineConfig({
  plugins: [
    {
      name: "portfolio-metadata",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return {
            html: html.replace("<title>Portfolio</title>", `<title>${portfolioConfig.metadata.browserTitle}</title>`),
            tags: metadataTags(),
          };
        },
      },
    },
  ],
});
