"use client";

import React, { useEffect, useState } from 'react';
import PackageCard from "@/components/helpfulComp/PackageCard";
import { Box, Container, Grid } from "@mui/material";
import api from '@/utils/apis';

export default function Bundles({ locale, dict }) {
  // استخراج النصوص الخاصة بالباقات من القاموس الممرر من السيرفر
  const Common = dict?.Packages?.Common || {};
  const isRtl = locale === 'ar';
  
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/bundles/');
        if (Array.isArray(response.data)) {
          setBundles(response.data);
        } else {
          setBundles([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Error: {error.message}</p>;

  return (
    <Box className="who-we-are pt-3" sx={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container
        sx={{
          width: "100%",
          maxWidth: { lg: "1400px" },
          marginY: "4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 2, lg: 4 },
          alignContent: isRtl ? "end" : "start",
          textAlign: isRtl ? "end" : "start",
          fontFamily: "Cairo",
          fontSize: "1rem",
          color: "#47C1CA",
          "& > div:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Cairo",
            textAlign: "center",
            "& > div:not(:last-child)": {
              marginBottom: "1rem",
            },
          }}
        >
          <Box sx={{ fontFamily: "Cairo", fontSize: "1rem", color: "#47C1CA", fontWeight: "medium" }}>
            {Common?.mainTitle}
          </Box>
          <Box
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#27307F",
              width: { xs: "100%", md: "80%", lg: "70%" },
              mx: "auto",
            }}
          >
            {Common?.mainDesc}
          </Box>
        </Box>
        
        <Grid
          container
          sx={{
            margin: "1rem 0",
            justifyContent: { xs: "center", md: isRtl ? "flex-end" : "flex-start" },
            gap: { xs: "0.6rem", md: "1rem", lg: "1.5rem" },
            flexWrap: "wrap",
          }}
        >
          {bundles.map((bundle, index) => (
            <PackageCard
              Bundle={bundle}
              key={bundle.id || index}
              locale={locale}
              dict={dict}
              cardWidth={{ xs: "100%", md: "calc((100% - 1rem) / 2)", lg: "calc((100% - 4.5rem) / 4)" }}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
}