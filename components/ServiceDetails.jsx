"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import api from "@/utils/apis";
import SectionsWithLeftImage from "@/components/Sections/SectionWithLeftImage";
import SectionsWithRightImage from "@/components/Sections/SectionWithRightImage";
import { useTheme } from "@emotion/react";
import { applyPageMetadata } from "@/utils/metadataServices";
import HowWeWork from "@/components/Sections/HowWeWork";
import Feedback from "@/components/Sections/Feedback";

export default function ServiceDetails({ locale, id }) {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // استخدام الـ locale و الـ id المُتمررين مباشرة من الـ Router الموحد
  const currentLang = locale || 'ar';
  const serviceSlug = id; 

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/services/by-slug/${serviceSlug}/?lang=${currentLang}`);
        setService(response.data);
      } catch (error) {
        console.error("Failed to load service", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceSlug) {
      fetchService();
    }
  }, [serviceSlug, currentLang]);

  // Apply metadata based on the service object and current language
  useEffect(() => {
    if (service) {
      applyPageMetadata(service);
    }

    return () => {
      document
        .querySelectorAll('meta[data-managed-by="prokeys"]')
        .forEach(tag => tag.remove());
    };
  }, [service, currentLang]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!service) {
    return (
      <Typography align="center" sx={{ mt: 8, color: '#27307F', fontWeight: 'bold' }}>
        {currentLang === 'ar' ? 'عذراً، الخدمة غير موجودة' : 'Service not found'}
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ py: 8, direction: currentLang === 'ar' ? 'rtl' : 'ltr' }}>
        <Container>
          {/* Page Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#1f2a7a",
              mb: 2,
              textAlign: "center",
            }}
          >
            {currentLang === "ar" ? service?.arabic_title : service?.english_title}
          </Typography>

          {/* Sections */}
          {service?.sections?.map((section, index) => (
            index % 2 === 0 ? (
              <SectionsWithRightImage key={index} data={section} locale={currentLang} />
            ) : (
              <SectionsWithLeftImage key={index} data={section} locale={currentLang} />
            )
          ))}
        </Container>
      </Box>
      <HowWeWork locale={currentLang} />
      <Feedback locale={currentLang} />
    </>
  );
}