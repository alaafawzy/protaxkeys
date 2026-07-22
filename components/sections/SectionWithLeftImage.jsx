// SectionWithLeftImage.jsx
"use client";
import React from 'react';
import { useTheme } from "@emotion/react";
import { getAltText } from '@/utils/getAltText';

export default function SectionWithLeftImage({ data }) {
    const theme = useTheme();
    const lang = theme.direction === 'rtl' ? 'rtl' : 'ltr';
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ order: lang === "ltr" ? 2 : 1 }}>
                    <img src={data?.image} alt={getAltText(data, theme.direction === 'rtl', 'Service section')} style={{ width: '90%', height: 'auto' }} />
                </div>
                <div style={{ textAlign: lang === 'rtl' ? 'right' : 'left' }}>
                    <div dangerouslySetInnerHTML={{ __html: theme.direction === "rtl" ? data?.arabic_content : data?.english_content }} />
                </div>
            </div>
        </div>
    );
}