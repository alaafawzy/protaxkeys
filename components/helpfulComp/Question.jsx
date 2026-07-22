"use client";

import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography, Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function Question({ ques, ans, bg, locale }) {
  const isRtl = locale === 'ar';
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    // تم استبدال Grid item بـ Box لضمان عدم ظهور خطأ الـ item نهائياً
    <Box sx={{ width: "100%", mb: 2 }}>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{
          backgroundColor: bg || "#fff",
          boxShadow: "none",
          border: "1px solid #27307F",
          "&:before": { display: "none" },
          direction: isRtl ? 'rtl' : 'ltr',
          textAlign: isRtl ? "right" : "left",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            flexDirection: isRtl ? "row-reverse" : "row",
            "& .MuiAccordionSummary-content": { flexDirection: "column" },
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "500", fontFamily: "Cairo", color: "#101828" }}>
            {ques}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider sx={{ width: "100%", borderColor: "#000000", mb: 3, fontWeight: "bold", borderBottomWidth: 2 }} />
          <Typography sx={{ fontWeight: "400", fontFamily: "Cairo", color: "rgba(79, 79, 79, 1)" }}>
            {ans}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}