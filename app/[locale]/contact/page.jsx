import ContactUs from '@/components/CountactUs';
import { getDictionary } from '@/getDictionary';

export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'ar';
  const dict = await getDictionary(locale);

  return <ContactUs locale={locale} dict={dict} />;
}