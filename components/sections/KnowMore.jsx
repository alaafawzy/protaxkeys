"use client";

import React from "react";
import { Container, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";

export default function KnowMore({ title }) {
  const { t } = useTranslation();
  const KnowMore = t("KnowMore");
  
  return (
    <Container sx={{ fontFamily: "Tajawal" }}>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center" }}>
        {title && <Box sx={{ color: "rgba(19, 31, 137, 1)", fontWeight: "700", marginBottom: "1rem" }}>{KnowMore.title}</Box>}
        <Box sx={{ width: '100%' }}>
          <ReactPlayer
            url="/video.webm" // تأكد أن الفيديو موجود في مجلد public
            width="100%"
            height="516px"
            controls={true}
          />
        </Box>
      </Box>
    </Container>
  );
}