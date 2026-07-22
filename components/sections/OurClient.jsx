"use client";

import React from "react";
import { Grid, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

const data = [
  "Kel.12", "Nebrass", "Me.mphis Tour", "Salsaiaa Cruise", 
  "Dwaa Cruise", "Staric onics", "Watad architecture", "Rakeyn", "Bluemeel",
];

export default function OurClient() {
  const { t } = useTranslation();
  const partners = t("partners");
  return (
    <Grid sx={{ bgcolor: "rgba(249, 250, 251, 1)", paddingTop: "2rem" }}>
      <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Grid container sx={{ fontFamily: "Tajawal", fontSize: "20px", fontWeight: "400", lineHeight: "30px", textAlign: "center", color: "rgba(79, 79, 79, 1)", justifyContent: "center" }}>
          {partners}
        </Grid>
        <Grid item md={12} xs={11} container sx={{ padding: "1rem 0", display: "flex", flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none" }}>
          {data.map((item, index) => (
             <SponserData key={index} img={item} />
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}

function SponserData({ img }) {
  return (
    <Grid item xs={4} md={5} sx={{ background: "white", color: "#131f89", minWidth: "200px", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center", margin: ".5rem", padding: "1rem", border: "2px solid #f0f0f0", borderRadius: "5px", textAlign: "center", fontSize: "1.2rem", fontWeight: "700" }}>
      {img}
    </Grid>
  );
}