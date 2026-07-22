"use client";

import React from "react";
import { Container, Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Link from "next/link"; 
import PackageCard from "@/components/PackageCard";
import Btn from "@/components/Btn";
import { icons } from "@/Data/Samka";
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function Packages() {
  const { t, i18n } = useTranslation();
  const { Basic, Additional, Custom, Common } = t("Packages");
  const bundles = [Custom, Additional, Basic];
  const prefix = useLangPrefix();
  const paths = getPagePathsForLang(i18n.language);

  return (
    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", fontFamily: "Tajawal" }}>
      <Grid container sx={{ justifyContent: { xs: "center", md: "space-between" }, alignItems: "stretch" }}>
        {bundles.map((bundle, index) => (
          <PackageCard key={index} svg={icons.extraPackage} Bundle={bundle} />
        ))}
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Link href={`${prefix}/${paths.bundles}`}>
          <Btn bg="rgba(19, 31, 137, 1)" FontColor="white" H="48px" W="272px">
            {Common?.showMore}
          </Btn>
        </Link>
      </Grid>
    </Container>
  );
}