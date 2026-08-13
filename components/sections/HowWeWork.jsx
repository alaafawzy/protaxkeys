"use client";

import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import CTAButton from "@/components/helpfulComp/CTAButton";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function HowWeWork({ locale, dict }) {
  const router = useRouter();
  
  const isEnglish = locale === "en";
  const isRtl = locale === "ar";
  const prefix = `/${locale}`;
  const paths = getPagePathsForLang(locale);
  
  const HowWeWorkData = dict?.HowWeWork || {};
  const arrowStyle = isEnglish ? { transform: "scaleX(-1)" } : {};
  
  const reserve = "/images/how we work/reserve.png";
  const choice2 = "/images/how we work/choice2.png";
  const upload = "/images/how we work/upload.png";
  const leftArrow = "/images/how we work/leftArrow.png";

  return (
    <Box sx={{ py: 10, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        
        {/* top title */}
        <Typography
          variant="body1"
          align="center"
          sx={{ color: "#47C1CA", mb: 1, fontSize: 18, fontFamily: "Cairo" }}
        >
          {HowWeWorkData.howTitle}
        </Typography>

        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            color: "#27307F",
            mb: 15,
            fontFamily: "Cairo",
            fontSize:"2.2rem"
          }}
        >
          {HowWeWorkData.howDesc}
        </Typography>

        {/* Steps - تم وضع خصائص التخطيط داخل sx لمنع انتقالها للـ DOM */}
        <Grid 
          container 
          spacing={4} 
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          
            <Grid xs={12} sm={6} md={3} sx={{ order: { xs: 3, md: 0 }, direction: isRtl ? 'ltr' : 'rtl' }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 16,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={upload} alt={HowWeWorkData.sesstionTitle3} width="250" />
                </Box>

                <Typography sx={{ fontSize: 48, fontWeight: "bold", color: "#235789", mb: 1, fontFamily: "Cairo" }}>
                  {3}
                </Typography>

                <Typography sx={{ fontSize: 21, fontWeight: "bold", color: "#27307F", mb: 1, fontFamily: "Cairo" }}>
                  {HowWeWorkData.sesstionTitle3}
                </Typography>

                <Typography sx={{ fontSize: 16, fontWeight:"medium", color: "#27307F", lineHeight: "26px", fontFamily: "Cairo" }}>
                  {HowWeWorkData.sesstionDesc3}
                </Typography>
              </Box>
            </Grid>

            <Grid md={1} sx={{ display: { xs: 'none', md: 'block' }, px: { md: 2 } }}>
              <Box
                sx={{
                  width: 16,
                  height: 80,
                  mb: 2,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 20,
                }}
              >
                <img src={leftArrow} alt="left arrow" width="120" style={arrowStyle} />
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={3} sx={{ order: { xs: 2, md: 0 }, direction: isRtl ? 'ltr' : 'rtl' }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 16,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={choice2} alt={HowWeWorkData.sesstionTitle2} width="250" />
                </Box>

                <Typography sx={{ fontSize: 48, fontWeight: "bold", color: "#235789", mb: 1, fontFamily: "Cairo" }}>
                  {2}
                </Typography>

                <Typography sx={{ fontSize: 21, fontWeight: "bold", color: "#27307F", mb: 1, fontFamily: "Cairo" }}>
                  {HowWeWorkData.sesstionTitle2}
                </Typography>

                <Typography sx={{ fontSize: 16, fontWeight:"medium", color: "#27307F", lineHeight: "26px", fontFamily: "Cairo" }}>
                  {HowWeWorkData.sesstionDesc2}
                </Typography>
              </Box>
            </Grid>

            <Grid md={1} sx={{ display: { xs: 'none', md: 'block' }, px: { md: 2 } }}>
              <Box
                sx={{
                  width: 15,
                  mb: 2,
                  mx: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 22,
                }}
              >
                <img src={leftArrow} alt="left arrow" width="120" style={arrowStyle}/>
              </Box>
            </Grid>

            <Grid xs={12} sm={6} md={3} sx={{ order: { xs: 1, md: 0 }, direction: isRtl ? 'ltr' : 'rtl' }}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 16,
                    height: 80,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
                    mb: 2,
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={reserve} alt={HowWeWorkData.sesstionTitle1} width="250" />
                </Box>

                <Typography sx={{ fontSize: 48, fontWeight: "bold", color: "#235789", mb: 1, fontFamily: "Cairo" }}>
                  {1}
                </Typography>

                <Typography sx={{ fontSize: 21, fontWeight: "bold", color: "#27307F", mb: 1, fontFamily: "Cairo" }}>
                  {HowWeWorkData.sesstionTitle1}
                </Typography>

                <Typography sx={{ fontSize: 16, fontWeight:"medium", color: "#27307F", lineHeight: "26px", fontFamily: "Cairo" }}>
                  {HowWeWorkData.sesstionDesc1}
                </Typography>
              </Box>
            </Grid>
          
        </Grid>

        <Box sx={{ marginTop: "2rem", textAlign: "center", marginBottom: "3rem" }}>
          <CTAButton
            label={dict?.Book?.btn || (isRtl ? 'احجز الآن' : 'Book Now')}
            onClick={() => router.push(`${prefix}/${paths.contact}`)}
          />
        </Box>
      </Container>
    </Box>
  );
}