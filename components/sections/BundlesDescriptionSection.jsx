"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import api from '@/utils/apis';
import { getAltText } from '@/utils/getAltText';

export default function DescriptionSection() {
    const theme = useTheme();
    const isRTL = theme.direction === 'rtl' ? false : true; // ملاحظة: تأكد من منطق الـ RTL هنا
    const [descriptionData, setDescriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/bundle/description-section/');
                if (Array.isArray(response.data)) { setDescriptionData(response.data[0]); }
            } catch (error) { console.error(error); } 
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

    const title = (isRTL ? descriptionData?.english_title : descriptionData?.arabic_title);
    const description = descriptionData
        ? (isRTL ? descriptionData?.english_description : descriptionData?.arabic_description)
        : '...'; // نص افتراضي
    const imageUrl = descriptionData?.image || "/images/bundlesection.png"; // تأكد من مسار الصورة

    return (
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '3rem 2rem', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: '4rem' }}>{title}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', order: isMobile ? 1 : (isRTL ? 2 : 1) }}>
                    <div style={{ width: '450px', height: '450px', borderRadius: '50%', overflow: 'hidden' }}>
                        <img src={imageUrl} alt={getAltText(descriptionData, isRTL, 'Bundles')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
                <div style={{ position: 'relative', order: isMobile ? 2 : (isRTL ? 1 : 2) }}>
                    <p style={{ fontSize: '1.35rem', color: '#333', lineHeight: 1.8, direction: isRTL ? 'ltr' : 'rtl', textAlign: 'start' }}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}