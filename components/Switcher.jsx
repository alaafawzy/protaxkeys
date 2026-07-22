"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function Switcher({ xs }) {
  const [open, setOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  // استخراج اللغة الحالية من الـ URL
  const currentLocale = pathname?.split('/')[1] === "ar" ? "ar" : "en";

  const changeLanguage = (code) => {
    const targetLang = code === "en" || code === "ar" ? code : (currentLocale === "en" ? "ar" : "en");

    // توجيه المستخدم لنفس الصفحة ولكن باللغة الجديدة
    if (pathname) {
      const newPath = pathname.replace(`/${currentLocale}`, `/${targetLang}`);
      router.replace(newPath);
    } else {
      router.replace(`/${targetLang}`);
    }

    setOpen(false);
  };

  const currentLanguage = languages.find((l) => l.code === currentLocale) || languages[0];

  return (
    <div className="position-relative">
      {/* الزر الأساسي (Trigger) */}
      <button
        className="btn p-0 border-0"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          minWidth: 60,
          height: 32,
          padding: "0 8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 16,
          backgroundColor: "transparent",
          fontSize: 14,
        }}
      >
        <span>{currentLanguage.label}</span>
      </button>

      {/* القائمة المنسدلة (Dropdown) */}
      {open && (
        <div
          className="shadow position-absolute bg-white rounded p-2"
          style={{
            right: 0,
            marginTop: 8,
            zIndex: 1000,
            minWidth: 120,
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`d-flex align-items-center gap-2 w-100 btn text-start mb-1 ${
                currentLocale === lang.code ? "btn-primary" : "btn-light"
              }`}
            >
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}