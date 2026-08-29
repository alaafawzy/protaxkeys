import { pagePaths } from '@/config/pagePaths';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://protaxkeys.com';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://protaxkeys.com/api';

function toAbsolute(path) {
  return `${SITE_URL}${path}`;
}

async function fetchJson(path) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Sitemap fetch failed for ${path}:`, error);
    return null;
  }
}

function staticPathsForLocale(locale) {
  const p = pagePaths[locale];
  return [
    `/${locale}`,
    `/${locale}/${p.about}`,
    `/${locale}/${p.bundles}`,
    `/${locale}/${p.services}`,
    `/${locale}/${p.contact}`,
    `/${locale}/${p.blogs}`,
    `/${locale}/${p.faq}`,
  ];
}

function mapServiceUrls(items, locale) {
  const p = pagePaths[locale];
  return items
    .map((item) => {
      const slug = locale === 'ar' ? item?.arabic_slug : item?.english_slug;
      if (!slug) return null;

      return {
        url: toAbsolute(`/${locale}/${p.services}/${slug}`),
        lastModified: item?.updated_at || item?.created_at || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    })
    .filter(Boolean);
}

function mapBlogUrls(items, locale) {
  const p = pagePaths[locale];
  return items
    .map((item) => {
      const slug = locale === 'ar' ? item?.arabic_slug : item?.english_slug;
      if (!slug) return null;

      return {
        url: toAbsolute(`/${locale}/${p.blogs}/${slug}`),
        lastModified: item?.updated_at || item?.created_at || new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    })
    .filter(Boolean);
}

export default async function sitemap() {
  const now = new Date();
  const staticEntries = ['ar', 'en']
    .flatMap((locale) => staticPathsForLocale(locale))
    .map((path) => ({
      url: toAbsolute(path),
      lastModified: now,
      changeFrequency: path === '/ar' || path === '/en' ? 'daily' : 'weekly',
      priority: path === '/ar' || path === '/en' ? 1 : 0.8,
    }));

  const [servicesRaw, blogsArRaw, blogsEnRaw] = await Promise.all([
    fetchJson('/services/services/'),
    fetchJson('/blog/blogs/?lang=ar'),
    fetchJson('/blog/blogs/?lang=en'),
  ]);

  const services = Array.isArray(servicesRaw) ? servicesRaw : [];
  const blogsAr = Array.isArray(blogsArRaw?.results) ? blogsArRaw.results : (Array.isArray(blogsArRaw) ? blogsArRaw : []);
  const blogsEn = Array.isArray(blogsEnRaw?.results) ? blogsEnRaw.results : (Array.isArray(blogsEnRaw) ? blogsEnRaw : []);

  const dynamicEntries = [
    ...mapServiceUrls(services, 'ar'),
    ...mapServiceUrls(services, 'en'),
    ...mapBlogUrls(blogsAr, 'ar'),
    ...mapBlogUrls(blogsEn, 'en'),
  ];

  return [...staticEntries, ...dynamicEntries];
}
