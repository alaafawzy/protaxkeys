"use client";

import React from "react";
import { Grid, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import CheckIcon from "@mui/icons-material/Check";
// قمت بتعديل المسار ليكون Absolute Import

export default function BulletPoint({ title,locale }) {
  const theme = useTheme();
  
  return (
    <Grid sx={{ display: "flex", flexDirection: locale === 'ar' ? 'row' : 'row-reverse' }}>
      <Box sx={{ color: "#333333", fontWeight: "medium", fontSize: "1rem" }}>
        {locale === 'ar' ? title?.arabic_advantage : title?.english_advantage}
      </Box>
      <Box>
        <CheckIcon 
          sx={{ 
            color: "#00A63E", 
            fontSize: 18, 
            mr: 1,
          }} 
        />
      </Box>
    </Grid>
  );
}