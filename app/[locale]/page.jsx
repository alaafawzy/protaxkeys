import Home from '@/components/Home'; // تأكد من المسار الصحيح للمكون
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;
  
  const slugArray = Array.isArray(slug) ? slug : [slug];
  let mainSlug = (slugArray[0] || '').toLowerCase();
  const subParam = slugArray[1]; // استخراج الـ I
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    let apiUrl = '';

    apiUrl = `${baseUrl}/metadata/`;

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

        return {
          title: title || (locale === 'ar' ? 'Protaxkeys' : 'Protaxkeys'),
          description: description || '',
          icons: {
            icon: '/logo.svg', // تأكد إن الصورة موجودة في مجلد public
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
  return {
    title: locale === 'ar' ? 'موقعنا' : 'Our Website',
    description: '',
    icons: {
            icon: '/logo.svg', // تأكد إن الصورة موجودة في مجلد public
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