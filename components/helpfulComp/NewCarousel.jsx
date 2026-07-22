"use client";

import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import { getAltText } from "@/utils/getAltText";

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(100%); }
`;

export default function InfiniteCarousel({ items = [], locale }) {
  const loopItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items];
  const isRTL = locale === 'ar';

  return (
    <Box sx={{ overflow: "hidden", width: "100%", whiteSpace: "nowrap" }}>
      <Box
        sx={{
          display: "inline-flex",
          animation: `${isRTL ? scrollRight : scrollLeft} 120s linear infinite`,
        }}
      >
        {loopItems.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src.logo}
            alt={getAltText(src, isRTL, src.name)}
            sx={{
              width: 120,
              my: 1,
              mx: 6,
              borderRadius: 2,
              objectFit: "contain",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}