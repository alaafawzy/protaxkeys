"use client";

import {
  Container,
  Typography,
  Box,
} from "@mui/material";
import SectionsWithLeftImage from "@/components/sections/SectionWithLeftImage";
import SectionsWithRightImage from "@/components/sections/SectionWithRightImage";
import HowWeWork from "@/components/sections/HowWeWork";
import Feedback from "@/components/sections/Feedback";

export default function ServiceDetails({ locale, dict, service }) {
  const currentLang = locale || 'ar';

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
            component="h1"
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
      <HowWeWork locale={currentLang} dict={dict} />
      <Feedback locale={currentLang} dict={dict} />
    </>
  );
}