"use client";

import React from 'react';
import { useTheme } from "@emotion/react";
import { useRouter } from 'next/navigation'; // التعديل: استخدام useRouter بدلاً من useNavigate
import { getAltText } from '@/utils/getAltText'; 
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function SectionsWithLeftPic({ data, imageOnRight = true }) {
  const theme = useTheme();
  const router = useRouter(); // التعديل: useRouter
  const prefix = useLangPrefix();
  const paths = getPagePathsForLang(theme.direction === 'rtl' ? 'ar' : 'en');
  
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '4rem 2rem',
      direction: theme.direction === 'rtl' ? 'rtl' : 'ltr',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div className='about-section'>
        <div>
          <img
            src={data?.section_image}
            alt={getAltText(data, theme.direction === 'rtl', data?.english_title)}
            style={{ width: '100%', height: 'auto', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          />
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', marginBottom: '1rem', lineHeight: 1.3 }}>
            {data?.title}
          </h2>
          <div 
            style={{ fontSize: '1rem', color: '#666', lineHeight: 1.8, marginBottom: '2rem' }}
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          <button
            onClick={() => router.push(`${prefix}/${paths.contact}`)} // التعديل: router.push
            style={{ backgroundColor: '#00bcd4', color: 'white', border: 'none', borderRadius: '8px', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer' }}
          >
            {theme.direction === 'rtl' ? 'احجز جلستك المجانية' : 'Book Your Free Session'}
          </button>
        </div>
      </div>
    </div>
  );
}