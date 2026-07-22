"use client";

import React from "react";
import { Box, Container } from "@mui/material";
import { usePageMetadata } from "@/hooks/useMetaData";
import DescriptionSection from "@/components/sections/ServicesDescriptionSection";
import Feedback from "@/components/sections/Feedback";
import ServicesSection from "@/components/ServiceSection";

export default function OurServices({ locale, dict }) {
  // Load metadata for services page
  usePageMetadata('services');

  const isRtl = locale === 'ar';

  return (
    <Box sx={{ width: "100%", direction: isRtl ? 'rtl' : 'ltr', py: 4 }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          "& > div:not(:last-child)": {
            marginBottom: "4rem",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: isRtl ? "right" : "left",
            marginBottom: "3rem",
            gap: 4,
          }}
        >
          <DescriptionSection locale={locale} dict={dict} />
          <ServicesSection locale={locale} dict={dict} />
          <Feedback locale={locale} dict={dict} />
        </Box>
      </Container>
    </Box>
  );
}