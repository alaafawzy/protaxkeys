"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import api from '@/utils/apis';
import { getAltText } from '@/utils/getAltText';

export default function DescriptionSection() {
    const theme = useTheme();
    const isRTL = theme.direction === 'rtl' ? false : true;
    const [descriptionData, setDescriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/services/description-section/');
                setDescriptionData(Array.isArray(response.data) ? response.data[0] : []);
            } catch (error) { console.error(error); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: '4rem' }}>
                {isRTL ? descriptionData?.english_title : descriptionData?.arabic_title}
            </h2>
            {/* بقية العرض بنفس منطق الـ grid الخاص بك */}
        </div>
    );
}