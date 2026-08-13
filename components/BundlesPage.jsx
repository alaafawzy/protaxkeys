"use client";

import React from 'react';
import { Box } from "@mui/material";
import { usePageMetadata } from "@/hooks/useMetaData";
import Bundles from '@/components/Bundles';
import DescriptionSection from '@/components/sections/BundlesDescriptionSection';
import OurSystems from '@/components/sections/OurSystems';
import Feedback from '@/components/sections/Feedback';

export default function BundlesPage({ locale, dict }) {
  // Load metadata for bundles page
  usePageMetadata('bundle');

  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  const isRtl = direction === 'rtl';

  return (
    <Box sx={{ width: "100%", direction: isRtl ? 'rtl' : 'ltr', py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: isRtl ? "right" : "left",
            gap: 4,
          }}
        >
          <DescriptionSection locale={locale} dict={dict} />
          <Bundles locale={locale} dict={dict} direction={direction} />
          <OurSystems locale={locale} dict={dict} />
          <Feedback locale={locale} dict={dict} />
        </Box>
      </Box>
    </Box>
  );
}