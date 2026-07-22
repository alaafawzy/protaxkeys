import React from "react";
// استدعينا دالة القاموس هنا لجلب الترجمة على السيرفر
import { getDictionary } from "@/getDictionary"; // تأكد من صحة المسار
import api from '@/utils/apis';

// استيراد الأقسام من المجلد الجديد
import HomeStarting from "./sections/HomeStarting";
import WhoAreU from "./sections/WhoAreU";
import HowWeWork from "./sections/HowWeWork";
import Bundles from "./Bundles";
import FAQ from "./sections/FAQ";
import OurSystems from "./sections/OurSystems";
import Feedback from "./sections/Feedback";

export default async function Home({ params }) {
  // 1. فك الـ params لمعرفة اللغة مرة واحدة فقط هنا
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || resolvedParams?.lang || 'ar';
  
  // 2. جلب القاموس (الترجمة) لتمريره لجميع الأقسام
  const dict = await getDictionary(locale);

  // 3. (اختياري) جلب بيانات قسم HomeStarting على السيرفر لسرعة الأداء (SEO)
  let homeStartingData = {};
  try {
    const response = await api.get('/homeStarting/');
    if (response.data && response.data.length > 0) {
      homeStartingData = response.data[0];
    }
  } catch (err) {
    console.error("Error fetching HomeStarting data on server:", err);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
      
      <HomeStarting locale={locale} dict={dict} data={homeStartingData} />
      
      <WhoAreU locale={locale} dict={dict} /> 

      <HowWeWork locale={locale} dict={dict} />

      
      <Bundles locale={locale} dict={dict} />
      <FAQ locale={locale} dict={dict} />
      <OurSystems locale={locale} dict={dict} />
      <Feedback locale={locale} dict={dict} /> 
      
    </div>
  );
}