// Central definition of route path segments per language.
// Backend can override these via the PagePath API; this file
// provides defaults and a small override layer.

const defaultPagePaths = {
  en: {
    home: "", // index route
    about: "about-us",
    faq: "faq",
    bundles: "bundles",
    services: "services",
    contact: "contact-us",
    blogs: "blogs",
  },
  ar: {
    home: "", // index route
    // Arabic paths written in Arabic, using URL-safe slugs
    about: "من-نحن",
    faq: "الأسئلة-الشائعة",
    bundles: "الباقات",
    services: "الخدمات",
    contact: "اتصل-بنا",
    blogs: "المدونة",
  },
};

// Holds backend-provided overrides, e.g. { en: { about: 'who-we-are' }, ar: { ... } }
let overrides = {
  en: {},
  ar: {},
};

/**
 * Apply overrides fetched from the backend.
 *
 * Expected shape:
 *   {
 *     en: { about?: string, faq?: string, bundles?: string, services?: string, contact?: string, blogs?: string },
 *     ar: { ...same keys... }
 *   }
 */
export function setPagePathOverrides(newOverrides) {
  if (!newOverrides) return;

  ["en", "ar"].forEach((lang) => {
    if (!newOverrides[lang]) return;
    overrides[lang] = {
      ...overrides[lang],
      ...newOverrides[lang],
    };
  });
}

export function getPagePathsForLang(lang) {
  const normalized = lang === "en" ? "en" : "ar";
  const base = {
    ...defaultPagePaths[normalized],
    ...overrides[normalized],
  };

  const makeDetailPath = (listPath) => {
    if (!listPath) return ":slug";
    // Avoid double slashes if someone accidentally adds a trailing slash
    return `${listPath.replace(/\/+$/, "")}/:slug`;
  };

  return {
    ...base,
    // Always derive detail routes from the list page paths
    serviceDetails: makeDetailPath(base.services),
    blogDetails: makeDetailPath(base.blogs),
  };
}

// Export defaults in case any code needs them directly
export const pagePaths = defaultPagePaths;