import 'bootstrap/dist/css/bootstrap.min.css';

import '../globals.css';

import Providers from '../../components/Providers';

import FloatingBookButton from '../../components/FloatingBookButton';

import Navbar from '../../components/Navbar';

import Footer from '../../components/Footer';

import { getDictionary } from '../../getDictionary';

// استدعاء ملف الـ config الخاص بك

import { getPagePathsForLang } from '@/config/pagePaths';



export const metadata = {

  title: 'مشروعي بـ Next.js',

  description: 'تم التحويل من React بنجاح',

};



export default async function RootLayout({ children, params }) {

  const resolvedParams = await params;

  const locale = resolvedParams.locale;

 

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  const dict = await getDictionary(locale);

 

  // جلب مسارات الصفحات بناءً على اللغة

  const paths = getPagePathsForLang(locale);



  return (

    <html lang={locale} dir={direction} data-scroll-behavior="smooth">

      <body>

        <Providers direction={direction}>

          {/* إرسال القاموس والمسارات للـ Navbar */}

          <Navbar dict={dict} locale={locale} paths={paths} />

         

          <main style={{ minHeight: 'calc(100vh - 200px)' }}>

            {children}

          </main>



          <FloatingBookButton

            bookNowText={dict.bookNow || 'احجز الآن'}

            contactHref={`/${locale}/${paths.contact}`}

          />



          {/* إرسال القاموس والاتجاه والمسارات للـ Footer */}

          <Footer dict={dict} locale={locale} direction={direction} paths={paths} />

        </Providers>

      </body>

    </html>

  );

} 

