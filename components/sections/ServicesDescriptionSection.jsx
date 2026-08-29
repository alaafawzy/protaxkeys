"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import { getAltText } from '@/utils/getAltText';

export default function DescriptionSection({ descriptionData }) {
    const theme = useTheme();
    const isRTL = theme.direction === 'rtl' ? false : true;
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // التحقق من البيئة لتجنب خطأ window في السيرفر
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 768);
            const handleResize = () => setIsMobile(window.innerWidth < 768);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    if (!descriptionData) return null;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: '4rem' }}>
                {isRTL ? descriptionData?.english_title : descriptionData?.arabic_title}
            </h1>
            {/* بقية العرض بنفس منطق الـ grid الخاص بك */}
        </div>
    );
}