"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
// تأكد من مسار هذه المكونات لديك
import NavButton from "./Button";
import Switcher from "./Switcher";

export default function Navbar({ dict, locale, paths }) {
  const theme = useTheme();
  const router = useRouter();
  
  // استبدال i18n بالقاموس الممرر من السيرفر
  const NavTitles = dict.Navbar;
  const prefix = `/${locale}`;

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-lg px-4" dir={theme.direction}>
      <style jsx>{`
        @media (max-width: 991.98px) {
          .navbar-nav {
            align-items: center;
            text-align: center;
          }
          .navbar-nav .nav-item {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .navbar-nav .nav-link {
            padding: 0.75rem 1rem;
          }
        }
        .nav-link {
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #47C1CA !important;
        }
      `}</style>
      
      <div className="container-fluid">
        {/* الشعار */}
        <Link className="navbar-brand order-0 order-lg-3" href={`${prefix}/`}>
          <Image src="/logo.svg" alt="Logo" height={72} width={62} />
        </Link>

        {/* زر فتح القائمة */}
        <button
          className="navbar-toggler order-1 order-lg-2"
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* زر الحجز - شاشات الديسكتوب */}
        <div className="order-2 order-lg-0 d-none d-lg-block">
          <NavButton onClick={() => router.push(`${prefix}/${paths.contact}`)}>
            {NavTitles?.button || "Contact"}
          </NavButton>
        </div>

        {/* روابط القائمة */}
        <div className={`collapse navbar-collapse order-3 order-lg-1 ${open ? "show" : ""}`} id="main-nav">
          <ul className="navbar-nav mx-auto gap-lg-4 fw-medium">
            <li className="nav-item">
              <Link className="nav-link" href={`${prefix}/`} onClick={close}>{NavTitles.home}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`${prefix}/${paths.about}`} onClick={close}>{NavTitles.who}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`${prefix}/${paths.bundles}`} onClick={close}>{NavTitles.bundles}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`${prefix}/${paths.services}`} onClick={close}>{NavTitles.services}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`${prefix}/${paths.blogs}`} onClick={close}>{NavTitles.blogs}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href={`${prefix}/${paths.contact}`} onClick={close}>{NavTitles.contact}</Link>
            </li>
            <li className="nav-item">
              <Switcher locale={locale} />
            </li>
            {/* زر الحجز - شاشات الجوال */}
            <li className="nav-item d-lg-none mt-3">
              <NavButton className="w-100" onClick={() => { router.push(`${prefix}/${paths.contact}`); close(); }}>
                {NavTitles?.button || "Contact"}
              </NavButton>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}