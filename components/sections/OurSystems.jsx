"use client";

import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import InfiniteCarousel from "@/components/helpfulComp/NewCarousel";
import api from "@/utils/apis";

export default function OurSystems({ locale, dict }) {
  const isRtl = locale === 'ar';
  
  // استخراج النص من القاموس الممرر عبر السيرفر
  const partnersText = dict?.Systems || (isRtl ? "أنظمة الشركاء" : "System Partners");
  
  const [systemPartners, setSystemPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemPartners = async () => {
      try {
        const response = await api.get('/system-partners/');
        setSystemPartners(response.data);
      } catch (error) { 
        console.error(error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchSystemPartners();
  }, []);

  return (
    <Box sx={{ paddingTop: "2rem", marginBottom: "4rem", direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        
        <Box 
          sx={{ 
            fontFamily: "Cairo", 
            fontSize: "2.2rem", 
            fontWeight: "700", 
            textAlign: "center", 
            marginBottom: 5,
            color: "#27307F"
          }}
        >
          {partnersText}
        </Box>

        <Box 
          sx={{ 
            width: "100%", 
            display: "flex", 
            justifyContent: "space-between", 
            padding: "1rem 0", 
            bgcolor: "rgba(71, 193, 202, 0.1)", 
            borderRadius: "25px", 
            overflow: "hidden", 
            marginTop: 5 
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>Loading...</Box>
          ) : systemPartners.length > 0 ? (
            <InfiniteCarousel items={systemPartners} locale={locale} />
          ) : (
            <Box sx={{ textAlign: 'center', width: '100%', py: 4 }}>No system partners available</Box>
          )}
        </Box>

      </Container>
    </Box>
  );
}