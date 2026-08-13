"use client";

import Link from "next/link";
import CTAButton from '../helpfulComp/CTAButton';
import { getPagePathsForLang } from "@/config/pagePaths";

export default function HomeStarting({ locale, dict, data }) {
  const isRtl = locale === 'ar';
  
  const prefix = `/${locale}`;
  const paths = getPagePathsForLang(locale);
  const backendURL = 'http://127.0.0.1:8000';
  
  const imageUrl = data?.image?.startsWith('http') 
    ? data.image 
    : data?.image ? `${backendURL}${data.image}` : '/images/landingnew.png';

  return (
    <section style={{ padding: "2rem 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        
        {/* حاوية رئيسية بتصميم Flexbox آمن 100% */}
        <div style={{ 
          display: "flex", 
          // flexDirection: isRtl ? "row-reverse" : "row",
          flexDirection: "row-reverse", 
          flexWrap: "wrap", 
          justifyContent: "space-between", 
          alignItems: "center",
          gap: "2rem",
          marginTop: "3rem",
        }}>
          
          {/* قسم الصورة */}
          <div style={{ flex: "1 1 45%", minHeight: "500px", position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                position: "absolute",
                top: 0,
                left: 0
              }}
            />
          </div>

          {/* قسم النصوص والأزرار */}
          <div style={{ 
            flex: "1 1 50%", 
            display: "flex", 
            flexDirection: "column", 
            // alignItems: isRtl ? "flex-end" : "flex-start", 
            // textAlign: isRtl ? "right" : "left",
            direction: isRtl ? 'rtl' : 'ltr'
          }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#27307F", marginBottom: "1.5rem" }}>
              {isRtl ? data?.arabic_title : data?.english_title}
            </h1>
            
            <h2 style={{ fontWeight: "bold", color: "#4F4F4F", marginBottom: "1rem", fontSize: "1.5rem" }}>
              {isRtl ? data?.arabic_subtitle : data?.english_subtitle}
            </h2>
            
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#333" }}>
              {isRtl ? data?.arabic_description : data?.english_description}
            </p>

            <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
              <Link href={`${prefix}/${paths.contact}`} style={{ textDecoration: 'none' }}>
                <CTAButton
                  label={dict?.bookFreeSession || (isRtl ? 'احجز جلستك المجانية' : 'Book Your Free Session')}
                />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}