"use client";

import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link"; // التعديل: استيراد Link من next/link
import { useLangPrefix } from "@/hooks/useLangPrefix"; // التعديل: استخدام المسار المطلق

export default function FormFrame({ children, subtitle, title }) {
  const { t } = useTranslation();
  const formFrame = t("FormFrame");
  const prefix = useLangPrefix();

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1000px",
        padding: "2rem",
      }}
    >
      <Grid
        container
        md={8}
        sx={{
          background: "white",
          flexDirection: "column",
          padding: "2rem 3rem",
          boxSizing: "border-box",
          borderRadius: "16px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          "& > div:not(:last-child)": {
            marginBottom: ".5rem",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {/* التعديل: تحديث مسار الصورة ليتم جلبه من مجلد public */}
          <img src="/images/logo4.png" alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
        </Grid>
        
        <Grid>
          <Box
            sx={{
              fontFamily: "Tajawal",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </Box>
          <Box
            sx={{
              fontFamily: "Tajawal",
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "24px",
              textAlign: "center",
              color: "#4F4F4F",
            }}
          >
            {subtitle}
          </Box>
        </Grid>

        {children}

        {/* التعديل: استخدام href بدلاً من to في Link الخاص بـ Next.js */}
        <Link href={`${prefix}/`}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              fontFamily: "Tajawal",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
              textAlign: "left",
              color: "#4F4F4F",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            {formFrame.mainPage}
          </Grid>
        </Link>
      </Grid>
    </Container>
  );
}