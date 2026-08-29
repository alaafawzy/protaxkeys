import Home from '@/components/Home'; // تأكد من المسار الصحيح للمكون

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://protaxkeys.com';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const canonical = `/${locale}`;
  const alternates = {
    canonical,
    languages: {
      ar: '/ar',
      en: '/en',
      'x-default': '/ar',
    },
  };

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://protaxkeys.com/api';
    const apiUrl = `${baseUrl}/metadata/`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } 
    });
    // console.log(apiUrl)
    if (response.ok) {
      const data = await response.json();
      // console.log(response)
      // الصفحات الرئيسية ترجع مصفوفة، صفحات التفاصيل ترجع كائن مباشر
      const item = Array.isArray(data) ? data[0] : data;

      if (item) {
        // تحديد العنوان مع إضافة بدائل (Fallbacks) في حال كانت صفحة التفاصيل تستخدم حقولاً مختلفة (مثل title العادي)
        const title = locale === 'ar' 
          ? (item.arabic_page_title_for_metadata ) 
          : (item.english_page_title_for_metadata);
        
        // تحديد الوصف مع بدائل
        const description = locale === 'ar' 
          ? (item.arabic_page_description_for_metadata ) 
          : (item.english_page_description_for_metadata);

        const pageTitle = title || 'Protaxkeys';
        const pageDescription = description || 'Protaxkeys consulting and accounting services.';

        return {
          title: pageTitle,
          description: pageDescription,
          alternates,
          openGraph: {
            type: 'website',
            locale: locale === 'ar' ? 'ar_AE' : 'en_US',
            url: canonical,
            title: pageTitle,
            description: pageDescription,
            siteName: 'Protaxkeys',
            images: [
              {
                url: '/logo.svg',
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
            images: ['/logo.svg'],
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
    console.error('Error fetching metadata for home page:', error);
  }

  // الميتا داتا الافتراضية
  return {
    title: locale === 'ar' ? 'Protaxkeys' : 'Protaxkeys',
    description: locale === 'ar'
      ? 'خدمات Protaxkeys للاستشارات والمحاسبة.'
      : 'Protaxkeys consulting and accounting services.',
    alternates,
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: `${SITE_URL}${canonical}`,
      title: 'Protaxkeys',
      description: locale === 'ar'
        ? 'خدمات Protaxkeys للاستشارات والمحاسبة.'
        : 'Protaxkeys consulting and accounting services.',
      siteName: 'Protaxkeys',
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

export default async function Page({ params }) {
  
  
  return (
    <>
      <Home params={params}/>
    </>
  );
}