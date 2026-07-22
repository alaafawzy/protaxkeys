"use client";

import React from 'react';
import { Box, Container } from "@mui/material";
import { usePageMetadata } from "@/hooks/useMetaData";
import Bundles from '@/components/Bundles';
import DescriptionSection from '@/components/sections/BundlesDescriptionSection';
import OurSystems from '@/components/sections/OurSystems';
import Feedback from '@/components/sections/Feedback';

export default function BundlesPage({ locale, dict }) {
  // Load metadata for bundles page
  usePageMetadata('bundle');

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
          <Bundles locale={locale} dict={dict} />
          <OurSystems locale={locale} dict={dict} />
          <Feedback locale={locale} dict={dict} />
        </Box>
      </Container>
    </Box>
  );
}