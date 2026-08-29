import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';

import '../globals.css';

import Providers from '../../components/Providers';

import FloatingBookButton from '../../components/FloatingBookButton';

import Navbar from '../../components/Navbar';

import Footer from '../../components/Footer';

import { getDictionary } from '../../getDictionary';

// استدعاء ملف الـ config الخاص بك

import { getPagePathsForLang } from '@/config/pagePaths';



const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://protaxkeys.com';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WTGWGRQQ';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Protaxkeys',
    template: '%s | Protaxkeys',
  },
  description: 'Protaxkeys consulting and accounting services in Arabic and English.',
  applicationName: 'Protaxkeys',
  alternates: {
    languages: {
      ar: '/ar',
      en: '/en',
      'x-default': '/ar',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Protaxkeys',
    url: SITE_URL,
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Protaxkeys',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protaxkeys',
    description: 'Protaxkeys consulting and accounting services in Arabic and English.',
    images: ['/logo.svg'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};



export default async function RootLayout({ children, params }) {

  const resolvedParams = await params;

  const locale = resolvedParams.locale;

 

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  const dict = await getDictionary(locale);

 

  // جلب مسارات الصفحات بناءً على اللغة

  const paths = getPagePathsForLang(locale);
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Protaxkeys',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [],
  };



  return (

    <html lang={locale} dir={direction} data-scroll-behavior="smooth">

      <head>
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>

      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="gtm"
            />
          </noscript>
        )}

        <Providers direction={direction}>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />

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

