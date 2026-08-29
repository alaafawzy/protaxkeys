"use client";

import React from "react";
import { usePageMetadata } from "@/hooks/useMetaData";
import Connectwithus from "@/components/sections/Connectwithus";
import { Grid } from "@mui/material";
import Feedback from "@/components/sections/Feedback";

export default function ContactUs({ locale, dict }) {
  // Load metadata for contact page
  usePageMetadata('contactus');

  return (
    <Grid sx={{ margin: "2rem 0" }}>
      <Connectwithus locale={locale} dict={dict} />
      <Feedback locale={locale} dict={dict} />
    </Grid>
  );
}