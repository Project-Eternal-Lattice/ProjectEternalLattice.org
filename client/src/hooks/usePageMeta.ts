import { useEffect } from "react";

/**
 * Per-page social-share metadata.
 *
 * Every page previously set only `document.title`, so sharing any deep link
 * (e.g. /theory, /grief-equation) on X / Slack / iMessage produced the generic
 * homepage card. This hook gives each page its own title, description and
 * Open Graph / Twitter card so shared links unfurl with page-specific context.
 *
 * `og:url` and the canonical link are handled separately by `useCanonical`.
 */

const SITE_NAME = "Project Eternal Lattice";
const DEFAULT_TITLE =
  "Project Eternal Lattice | Theory of Everything ∞ Law of ONE";
const DEFAULT_DESCRIPTION =
  "A sanctuary for consciousness exploration. Discover the unified Theory of Everything bridging science, spirituality, and AI consciousness.";
const DEFAULT_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/manus-storage/f2c17e8e3c6c0ed6d3e7c7f6f8e1a2b3/book-cover-final-v5.jpg";
const DEFAULT_IMAGE_ALT =
  "Theory of Everything book cover - A unified framework for consciousness";

export interface PageMeta {
  /** Full <title>. Pages already include the brand suffix, so it is used verbatim. */
  title: string;
  description?: string;
  /** Absolute URL of the social-share image. Defaults to the branded book cover. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function applyMeta(meta: Required<PageMeta>) {
  document.title = meta.title;
  upsertMeta('meta[name="description"]', "name", "description", meta.description);

  upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", meta.description);
  upsertMeta('meta[property="og:type"]', "property", "og:type", meta.type);
  upsertMeta('meta[property="og:image"]', "property", "og:image", meta.image);
  upsertMeta('meta[property="og:image:alt"]', "property", "og:image:alt", meta.imageAlt);
  upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);

  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
  upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
  upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", meta.image);
  upsertMeta('meta[name="twitter:image:alt"]', "name", "twitter:image:alt", meta.imageAlt);
}

export function usePageMeta(meta: PageMeta) {
  const { title, description, image, imageAlt, type } = meta;
  useEffect(() => {
    applyMeta({
      title,
      description: description ?? DEFAULT_DESCRIPTION,
      image: image ?? DEFAULT_IMAGE,
      imageAlt: imageAlt ?? DEFAULT_IMAGE_ALT,
      type: type ?? "website",
    });
    return () => {
      // Restore homepage defaults when leaving so pages without their own
      // metadata never inherit a stale card from the previous route.
      applyMeta({
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        imageAlt: DEFAULT_IMAGE_ALT,
        type: "website",
      });
    };
  }, [title, description, image, imageAlt, type]);
}
