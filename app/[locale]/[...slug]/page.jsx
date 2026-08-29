import React from 'react';
import BundlesPage from '@/components/BundlesPage';
import ContactPage from '@/components/CountactUs';
import AboutUs from '@/components/AboutUs';
import OurServises from '@/components/OurServises';       
import ServiceDetails from '@/components/ServiceDetails'; 
import Blogs from '@/components/Blogs';                   
import BlogDetails from '@/components/BlogDetails';       
import FQA from '@/components/FQA';                       
import { getPagePathsForLang, setPagePathOverrides } from '@/config/pagePaths';
import api from '@/utils/apis';
import { getDictionary } from '@/getDictionary';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.protaxkeys.com/api';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://protaxkeys.com';

async function fetchServerJson(path) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Server fetch failed for ${path}:`, error);
    return null;
  }
}

async function fetchBlogsPage(locale, page) {
  const data = await fetchServerJson(`/blog/blogs/?lang=${locale}&page=${page}`);

  if (!data) {
    return { blogs: [], totalPages: 1, hasError: true };
  }

  if (Array.isArray(data)) {
    return { blogs: data, totalPages: 1, hasError: false };
  }

  const results = Array.isArray(data.results) ? data.results : [];
  const count = data.count || results.length;
  const pageSize = data.page_size || Math.max(results.length, 1);

  return {
    blogs: results,
    totalPages: Math.max(1, Math.ceil(count / pageSize)),
    hasError: false,
  };
}

async function fetchBlogBySlug(locale, slug) {
  return fetchServerJson(`/blog/blogs/by-slug/${slug}/?lang=${locale}`);
}

async function fetchServicesList() {
  const data = await fetchServerJson('/services/services/');
  return Array.isArray(data) ? data : [];
}

async function fetchServiceBySlug(locale, slug) {
  return fetchServerJson(`/services/services/by-slug/${slug}/?lang=${locale}`);
}

async function fetchServicesDescription() {
  const data = await fetchServerJson('/services/description-section/');
  return Array.isArray(data) ? (data[0] || null) : null;
}

function normalizeApiSectionSlug(input) {
  const slug = (input || '').toLowerCase();

  if (/about|من نحن|من-نحن/i.test(slug)) return 'about';
  if (/bundle|باق/i.test(slug)) return 'bundle';
  if (/blog|مدون/i.test(slug)) return 'blog';
  if (/contact|تواصل|اتصل/i.test(slug)) return 'contactus';
  if (/servic|خدم/i.test(slug)) return 'services';

  return slug;
}

function resolvePageKey(mainSlug, locale) {
  const currentPaths = getPagePathsForLang(locale);
  for (const [key, value] of Object.entries(currentPaths)) {
    const pathValues = Array.isArray(value) ? value : [value];
    if (pathValues.map(v => v.toLowerCase()).includes(mainSlug)) {
      return key;
    }
  }

  if (['services', 'ourservises', 'الخدمات'].includes(mainSlug)) return 'services';
  if (['blogs', 'المدونة'].includes(mainSlug)) return 'blogs';
  if (['about', 'about-us', 'من-نحن'].includes(mainSlug)) return 'aboutUs';
  if (['contact', 'contactus', 'اتصل-بنا', 'تواصل-معنا'].includes(mainSlug)) return 'contact';
  if (['bundles', 'الباقات'].includes(mainSlug)) return 'bundles';
  if (['faq', 'الأسئلة-الشائعة'].includes(mainSlug)) return 'faq';

  return '';
}

function buildLocalizedPagePath(targetLocale, pageKey, subParam, item) {
  const paths = getPagePathsForLang(targetLocale);

  switch (pageKey) {
    case 'aboutUs':
    case 'about':
      return `/${targetLocale}/${paths.about}`;
    case 'bundles':
      return `/${targetLocale}/${paths.bundles}`;
    case 'contact':
      return `/${targetLocale}/${paths.contact}`;
    case 'faq':
      return `/${targetLocale}/${paths.faq}`;
    case 'services':
      if (subParam) {
        const targetSlug = targetLocale === 'ar' ? item?.arabic_slug : item?.english_slug;
        if (!targetSlug) return `/${targetLocale}/${paths.services}`;
        return `/${targetLocale}/${paths.serviceDetails.replace(':slug', targetSlug)}`;
      }
      return `/${targetLocale}/${paths.services}`;
    case 'blogs':
      if (subParam) {
        const targetSlug = targetLocale === 'ar' ? item?.arabic_slug : item?.english_slug;
        if (!targetSlug) return `/${targetLocale}/${paths.blogs}`;
        return `/${targetLocale}/${paths.blogDetails.replace(':slug', targetSlug)}`;
      }
      return `/${targetLocale}/${paths.blogs}`;
    default:
      return `/${targetLocale}`;
  }
}

function buildAlternates(pageKey, locale, subParam, item) {
  const canonical = buildLocalizedPagePath(locale, pageKey, subParam, item);
  const arPath = buildLocalizedPagePath('ar', pageKey, subParam, item);
  const enPath = buildLocalizedPagePath('en', pageKey, subParam, item);

  return {
    canonical,
    languages: {
      ar: arPath,
      en: enPath,
      'x-default': arPath,
    },
  };
}

// 1. دالة جلب الميتا داتا (تُنفذ على السيرفر قبل رسم الصفحة)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  
  const slugArray = Array.isArray(slug) ? slug : [slug];
  const routeSlug = (slugArray[0] || '').toLowerCase();
  const subMainSlug = routeSlug;
  const subParam = slugArray[1]; // استخراج الـ ID أو الـ Slug الخاص بصفحة التفاصيل إن وُجد

  const mainSlug = normalizeApiSectionSlug(routeSlug);
  const pageKey = resolvePageKey(routeSlug, locale);

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://www.protaxkeys.com/api';
    let apiUrl = '';

    if (subParam) {
      // 1. حالة صفحة التفاصيل (Blog Details / Service Details)
      // يتم استدعاء الـ endpoint المخصص للعنصر بناءً على الـ ID[cite: 9]

      apiUrl = `${baseUrl}/${subMainSlug}/${subParam}/`;
      if (mainSlug === 'services') {
        apiUrl = `${baseUrl}/services/services/by-slug/${subParam}/?lang=${locale}`;
      }
      if (mainSlug === 'blog') {
        apiUrl = `${baseUrl}/blog/blogs/by-slug/${subParam}/?lang=${locale}`;
      }
    } else {
      // 2. حالة الصفحة الرئيسية (About, Blogs list, etc.)
      apiUrl = `${baseUrl}/${mainSlug}/metadata/`;
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } 
    });
    // console.log(apiUrl)
    if (response.ok) {
      const data = await response.json();
      
      // الصفحات الرئيسية ترجع مصفوفة، صفحات التفاصيل ترجع كائن مباشر
      const item = Array.isArray(data) ? data[0] : data;

      if (item) {
        const title = locale === 'ar'
          ? (item.arabic_page_title_for_metadata || item.arabic_title || item.title)
          : (item.english_page_title_for_metadata || item.english_title || item.title);

        const description = locale === 'ar'
          ? (item.arabic_page_description_for_metadata || item.arabic_description || item.description)
          : (item.english_page_description_for_metadata || item.english_description || item.description);

        const pageTitle = title || 'Protaxkeys';
        const pageDescription = description || 'Protaxkeys consulting and accounting services.';
        const imageUrl = item.image || '/logo.svg';
        const alternates = buildAlternates(pageKey, locale, subParam, item);

        return {
          title: pageTitle,
          description: pageDescription,
          alternates,
          robots: {
            index: true,
            follow: true,
          },
          openGraph: {
            type: subParam ? 'article' : 'website',
            locale: locale === 'ar' ? 'ar_AE' : 'en_US',
            url: `${SITE_URL}${alternates.canonical}`,
            title: pageTitle,
            description: pageDescription,
            siteName: 'Protaxkeys',
            images: [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: pageTitle,
              },
            ],
          },
          twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [imageUrl],
          },
          icons: {
            icon: '/logo.svg',
          },
        };
      }
    }
    else {
      console.log(response)
    }
  } catch (error) {
    console.error(`Error fetching metadata for API /${mainSlug}/${subParam || ''} :`, error);
  }

  // الميتا داتا الافتراضية
  const fallbackAlternates = buildAlternates(pageKey, locale, subParam, null);
  return {
    title: 'Protaxkeys',
    description: locale === 'ar'
      ? 'خدمات Protaxkeys للاستشارات والمحاسبة.'
      : 'Protaxkeys consulting and accounting services.',
    alternates: fallbackAlternates,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: `${SITE_URL}${fallbackAlternates.canonical}`,
      title: 'Protaxkeys',
      description: locale === 'ar'
        ? 'خدمات Protaxkeys للاستشارات والمحاسبة.'
        : 'Protaxkeys consulting and accounting services.',
      siteName: 'Protaxkeys',
      images: [{ url: '/logo.svg', width: 1200, height: 630, alt: 'Protaxkeys' }],
    },
    twitter: {
      card: 'summary',
      title: 'Protaxkeys',
      description: locale === 'ar'
        ? 'خدمات Protaxkeys للاستشارات والمحاسبة.'
        : 'Protaxkeys consulting and accounting services.',
    },
    icons: {
      icon: '/logo.svg',
    },
  };
}

// 2. دالة لجلب الـ overrides من الباك إند
async function fetchAndSetPaths() {
  try {
    const response = await api.get('/metadata/');
    if (response?.data) {
      setPagePathOverrides(response.data);
    }
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn("API Endpoint '/settings/page-paths/' returned 404. Using default paths.");
    } else {
      console.error("Error fetching paths:", error.message);
    }
  }
}

// 3. مكون الصفحة الديناميكية الأساسي
export default async function DynamicPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { locale, slug } = resolvedParams;
  const dict = await getDictionary(locale);

  // جلب وتطبيق تعديلات الباك إند أولاً
  await fetchAndSetPaths();

  const slugArray = Array.isArray(slug) ? slug : [slug];
  const mainSlug = decodeURIComponent(slugArray[0] || '').toLowerCase();
  const subParam = slugArray[1]; 

  // جلب خريطة المسارات بعد التحديث
  const currentPaths = getPagePathsForLang(locale);

  let matchedPageKey = '';
  for (const [key, value] of Object.entries(currentPaths)) {
    const pathValues = Array.isArray(value) ? value : [value];
    if (pathValues.map(v => v.toLowerCase()).includes(mainSlug)) {
      matchedPageKey = key;
      break;
    }
  }

  // احتياطي للمسميات الافتراضية
  if (!matchedPageKey) {
    if (['services', 'ourservises', 'الخدمات'].includes(mainSlug)) matchedPageKey = 'services';
    if (['blogs', 'المدونة'].includes(mainSlug)) matchedPageKey = 'blogs';
    if (['about', 'about-us', 'من-نحن'].includes(mainSlug)) matchedPageKey = 'aboutUs';
    if (['contact', 'contactus', 'اتصل-بنا', 'تواصل-معنا'].includes(mainSlug)) matchedPageKey = 'contact';
    if (['bundles', 'الباقات'].includes(mainSlug)) matchedPageKey = 'bundles';
    if (['faq', 'الأسئلة-الشائعة'].includes(mainSlug)) matchedPageKey = 'faq';
  }

  const pageQuery = Array.isArray(resolvedSearchParams?.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams?.page;
  const currentPage = Math.max(1, Number.parseInt(pageQuery || '1', 10) || 1);

  let blogsData = null;
  let blogDetailsData = null;
  let servicesList = null;
  let serviceDetailsData = null;
  let servicesDescriptionData = null;

  if (matchedPageKey === 'blogs') {
    if (subParam) {
      blogDetailsData = await fetchBlogBySlug(locale, subParam);
    } else {
      blogsData = await fetchBlogsPage(locale, currentPage);
    }
  }

  if (matchedPageKey === 'services') {
    if (subParam) {
      serviceDetailsData = await fetchServiceBySlug(locale, subParam);
    } else {
      const [services, descriptionData] = await Promise.all([
        fetchServicesList(),
        fetchServicesDescription(),
      ]);
      servicesList = services;
      servicesDescriptionData = descriptionData;
    }
  }

  const renderPageContent = () => {
    switch (matchedPageKey) {
      case 'aboutUs':
      case 'about-us':
      case 'aboutUs':
      case 'about':
        return <AboutUs locale={locale} params={resolvedParams} />;
        
      case 'bundles':
        return <BundlesPage locale={locale} params={resolvedParams} />;
        
      case 'contact':
        return <ContactPage locale={locale} dict={dict} params={resolvedParams} />;

      case 'services':
        if (subParam) {
          return <ServiceDetails locale={locale} dict={dict} service={serviceDetailsData} />;
        }
        return (
          <OurServises
            locale={locale}
            dict={dict}
            services={servicesList || []}
            descriptionData={servicesDescriptionData}
          />
        );

      case 'blogs':
        if (subParam) {
          return <BlogDetails locale={locale} blog={blogDetailsData} />;
        }
        return (
          <Blogs
            locale={locale}
            blogs={blogsData?.blogs || []}
            page={currentPage}
            totalPages={blogsData?.totalPages || 1}
            hasError={Boolean(blogsData?.hasError)}
          />
        );

      case 'faq':
        return <FQA locale={locale} params={resolvedParams} />;

      default:
        return (
          <div style={{ textAlign: 'center', padding: '5rem 0', fontFamily: 'Cairo', fontSize: '1.5rem', color: '#27307F' }}>
            {locale === 'ar' ? 'الصفحة غير موجودة (404)' : 'Page Not Found (404)'}
          </div>
        );
    }
  };

  return (
    <main>
      {renderPageContent()}
    </main>
  );
}