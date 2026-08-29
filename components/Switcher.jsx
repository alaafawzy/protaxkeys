"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getPagePathsForLang } from "@/config/pagePaths";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

const ROUTE_KEYS = ["about", "faq", "bundles", "services", "contact", "blogs"];

function normalizeSegment(segment) {
  if (!segment) return "";
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function mapLocalizedSegment(sourceLang, targetLang, segment) {
  if (!segment) return segment;

  const normalizedSegment = normalizeSegment(segment);
  const sourcePaths = getPagePathsForLang(sourceLang);
  const targetPaths = getPagePathsForLang(targetLang);
  const matchedKey = ROUTE_KEYS.find((key) => {
    const sourceSegment = sourcePaths[key];
    if (!sourceSegment) return false;

    return (
      sourceSegment === normalizedSegment ||
      sourceSegment === segment ||
      encodeURIComponent(sourceSegment) === segment
    );
  });

  return matchedKey ? targetPaths[matchedKey] : normalizedSegment;
}

export default function Switcher({ locale }) {
  const [open, setOpen] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // استخراج اللغة الحالية من الـ URL
  const currentLocale = locale === "ar" || locale === "en"
    ? locale
    : (pathname?.split('/')[1] === "ar" ? "ar" : "en");

  const changeLanguage = (code) => {
    const targetLang = code === "en" || code === "ar" ? code : (currentLocale === "en" ? "ar" : "en");

    if (targetLang === currentLocale) {
      setOpen(false);
      return;
    }

    // توجيه المستخدم لنفس الصفحة ولكن باللغة الجديدة
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);

      if (segments.length === 0) {
        router.replace(`/${targetLang}`);
      } else {
        const [, ...rest] = segments;

        if (rest.length === 0) {
          router.replace(`/${targetLang}`);
        } else {
          const mappedFirst = mapLocalizedSegment(currentLocale, targetLang, rest[0]);
          const newPath = `/${targetLang}/${[mappedFirst, ...rest.slice(1)].join('/')}`;
          const query = searchParams?.toString();
          router.replace(query ? `${newPath}?${query}` : newPath);
        }
      }
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