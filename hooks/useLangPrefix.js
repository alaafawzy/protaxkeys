"use client";

import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

/**
 * Returns the current language prefix for routes, e.g. "/en" or "/ar".
 * Falls back to the active i18n language if the URL has no :lang segment.
 */
export function useLangPrefix() {
  const params = useParams();
  const lang = params?.lang;
  const { i18n } = useTranslation();

  const urlLang = lang === "en" || lang === "ar" ? lang : null;
  const activeLang = urlLang || (i18n.language === "en" ? "en" : "ar");

  return `/${activeLang}`;
}