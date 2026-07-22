import Home from '@/components/Home'; // تأكد من المسار الصحيح للمكون
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

export default async function Page({ params }) {
  
  
  return (
    <>
      <Home params={params}/>
    </>
  );
}