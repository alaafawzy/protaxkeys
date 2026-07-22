"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

const CourseCard = ({ icon, title, description }) => {
  return (
    <Box
      sx={{
        width: "480px",
        minHeight: 230,
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        transition: "all 0.3s ease",
        bgcolor: "#27307F",
        "&:hover": {
          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: "12px",
          bgcolor: "primary.light",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          color: "primary.main",
        }}
      >
        {icon}
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, fontSize: 20, color: "text.primary" }}
      >
        {title}
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontSize: 14 }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default CourseCard;