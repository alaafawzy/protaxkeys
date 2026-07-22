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

// 1. دالة جلب الميتا داتا (تُنفذ على السيرفر قبل رسم الصفحة)
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  
  const slugArray = Array.isArray(slug) ? slug : [slug];
  let mainSlug = (slugArray[0] || '').toLowerCase();
  const subParam = slugArray[1]; // استخراج الـ ID أو الـ Slug الخاص بصفحة التفاصيل إن وُجد

  // توحيد أسماء المسارات لتتطابق مع الـ API
  if (mainSlug === "about-us") mainSlug = "about";
  if (mainSlug === "bundles") mainSlug = "bundle";
  if (mainSlug === "blogs" || mainSlug === "المدونة") mainSlug = "blog";
  if (mainSlug === "contact-us") mainSlug = "contactus";
  if (mainSlug === "services" || mainSlug === "ourservises") mainSlug = "services"; // أو service حسب اسم الـ endpoint عندك

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    let apiUrl = '';

    if (subParam) {
      // 1. حالة صفحة التفاصيل (Blog Details / Service Details)
      // يتم استدعاء الـ endpoint المخصص للعنصر بناءً على الـ ID[cite: 9]
      apiUrl = `${baseUrl}/${mainSlug}/${subParam}/`;
    } else {
      // 2. حالة الصفحة الرئيسية (About, Blogs list, etc.)
      apiUrl = `${baseUrl}/${mainSlug}/metadata/`;
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } 
    });

    if (response.ok) {
      const data = await response.json();
      
      // الصفحات الرئيسية ترجع مصفوفة، صفحات التفاصيل ترجع كائن مباشر
      const item = Array.isArray(data) ? data[0] : data;

      if (item) {
        // تحديد العنوان مع إضافة بدائل (Fallbacks) في حال كانت صفحة التفاصيل تستخدم حقولاً مختلفة (مثل title العادي)
        const title = locale === 'ar' 
          ? (item.arabic_page_title_for_metadata || item.arabic_title || item.title || item.name) 
          : (item.english_page_title_for_metadata || item.english_title || item.title || item.name);
        
        // تحديد الوصف مع بدائل
        const description = locale === 'ar' 
          ? (item.arabic_page_description_for_metadata || item.meta_description || item.description) 
          : (item.english_page_description_for_metadata || item.meta_description || item.description);

        return {
          title: title || (locale === 'ar' ? 'موقعنا' : 'Our Website'),
          description: description || '',
        };
      }
    }
  } catch (error) {
    console.error(`Error fetching metadata for API /${mainSlug}/${subParam || ''} :`, error);
  }

  // الميتا داتا الافتراضية
  return {
    title: locale === 'ar' ? 'موقعنا' : 'Our Website',
    description: '',
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
export default async function DynamicPage({ params }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

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
        return <ContactPage locale={locale} params={resolvedParams} />;

      case 'services':
        if (subParam) {
          return <ServiceDetails locale={locale} id={subParam} slug={subParam} params={resolvedParams} />;
        }
        return <OurServises locale={locale} params={resolvedParams} />;

      case 'blogs':
        if (subParam) {
          return <BlogDetails locale={locale} id={subParam} slug={subParam} params={resolvedParams} />;
        }
        return <Blogs locale={locale} params={resolvedParams} />;

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