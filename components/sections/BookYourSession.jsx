"use client";

import React from "react";
import { Grid, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link"; // التعديل: استيراد Link من next/link
import Btn from "@/components/Btn";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function BookYourSession() {
  const { t, i18n } = useTranslation();
  const Book = t("Book");
  const prefix = useLangPrefix();
  const paths = getPagePathsForLang(i18n.language);
  
  return (
    <Grid sx={{ bgcolor: "rgba(249, 250, 251, 1)" }}>
      <Container>
        <Grid sx={{ display: "flex", flexDirection: { md: "row-reverse", xs: "column" }, justifyContent: "space-between", padding: { md: "4rem", xs: "0.5rem" } }}>
          <Grid item md={5} xs={11} sx={{ fontFamily: "Tajawal", fontSize: "24px", fontWeight: "700", textAlign: "center", color: "rgba(26, 26, 26, 1)" }}>
            {Book.des}
          </Grid>
          <Grid item md={5} xs={11} sx={{ display: "flex", justifyContent: "center" }}>
            <Link href={`${prefix}/${paths.contact}`}> {/* التعديل: استخدام href */}
              <Btn bg={"rgba(19, 31, 137, 1)"} FontColor={"white"} H={"60px"} W={"200px"}>
                {Book.btn}
              </Btn>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}