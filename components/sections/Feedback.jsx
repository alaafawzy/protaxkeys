"use client";

import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import api from "@/utils/apis";
import TestimonialCarousel from "@/components/helpfulComp/feedbackCarousel"; // أو اسم ملف الـ Carousel لديك

export default function Feedback({ locale, dict }) {
  const isRtl = locale === 'ar';
  
  // استخراج النصوص من القاموس الممرر من السيرفر
  const feed1 = dict?.Feedback?.feed1 || {};
  const whatTheySay = feed1.whatTheySay || (isRtl ? "آراء العملاء" : "What They Say");
  const subtitle = feed1.subtitle || "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/all-comments/');
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (error) { 
        console.error(error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  return (
    <Box 
      sx={{ 
        width: "100%", 
        display: "flex", 
        flexDirection: "column", 
        direction: isRtl ? 'rtl' : 'ltr', 
        fontFamily: "Cairo",
        py: 4 
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", marginTop: 5 }}>
          <Box sx={{ color: "#27307F", fontWeight: "700", fontSize: "2.2rem" }}>
            {whatTheySay}
          </Box>
          {subtitle && <Box sx={{ mt: 1, color: "#666" }}>{subtitle}</Box>}
          
          <Box sx={{ width: "100%", display: 'flex', marginTop: 5, justifyContent: "center" }}>
            {loading ? (
              <Box sx={{ py: 4 }}>Loading...</Box>
            ) : (
              <TestimonialCarousel items={data} locale={locale} />
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
