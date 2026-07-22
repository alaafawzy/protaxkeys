"use client";

import React from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import BulletPoint from "./BulletPoint";
import CTAButton from "@/components/helpfulComp/CTAButton";
import { useRouter } from "next/navigation";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function PackageCard({ Bundle, svg, locale, dict }) {
  const router = useRouter();
  const isRTL = locale === 'rtl' || locale === 'ar';
  
  const prefix = `/${locale}`;
  const paths = getPagePathsForLang(locale);
  
  const isBestSeller = Boolean(Bundle?.best_seller);
  const originalPrice = Bundle?.price || 0;
  const discount = Bundle?.discount || 0;
  const hasDiscount = discount > 0;
  
  // النصوص المترجمة
  const priceText = isRTL 
    ? `${originalPrice} ر.س شهرياً` 
    : `${originalPrice} SAR/month`;
  
  const offerText = hasDiscount 
    ? (isRTL 
        ? `خصم ${discount}% للاشتراك السنوي` 
        : `${discount}% off for annual subscription`)
    : null;
  
  const bookBtnText = dict?.Book?.btn || (isRTL ? 'احجز الآن' : 'Book Now');

  return (
    <Box 
      sx={{ 
        width: { xs: "100%", md: "30%" },
        marginY: { xs: ".5rem" }, 
        maxWidth: { xs: "400px", md: "100%" }, 
        mx: { xs: "auto", md: "unset" },
        display: "flex"
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100%",
          textAlign: "center",
          padding: "1.5rem 1rem",
          boxShadow: isBestSeller
            ? "0px 16px 22px 6px rgba(33, 119, 255, 0.2)"
            : "0px 12px 16px 4px rgba(16, 24, 40, 0.08)",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: isRTL ? "flex-end" : "flex-start",
          fontWeight: "700",
          pl: isRTL ? 3 : 2,
          pr: isRTL ? 2 : 3,
          background: isBestSeller
            ? "linear-gradient(180deg, #E7F0FF 0%, #D8E7FF 40%, #CFE0FF 70%)"
            : "white",
          border: isBestSeller ? "2px solid #5B7BFF" : "2px solid #27307F",
          transition: "0.3s",
          "&:hover": {
            background: isBestSeller ? "linear-gradient(180deg, #E2ECFF 0%, #D3E2FF 40%, #C8DBFF 70%)" : "#fdfdfd",
            transform: "scale(1.01)",
          },
          "& > div:not(:last-child)": {
            marginBottom: "1rem",
          },
        }}
      >
        {/* شارة الأكثر شعبية */}
        {isBestSeller && (
          <Box
            sx={{
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(90deg, #131F89 100%, #47C1CA 100%)",
              color: "#FFFFFF",
              borderRadius: "999px",
              zIndex: 10,
              px: 2,
              py: 1,
              fontSize: "0.9rem",
              fontWeight: 700,
              fontFamily: "Cairo",
              boxShadow: "0 8px 18px rgba(31, 122, 205, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <span>★</span>
            <span>{isRTL ? "الأكثر شعبية" : "Most Popular"}</span>
          </Box>
        )}

        <CardInfo
          svg={svg}
          cardTitle={isRTL ? Bundle?.arabic_name : Bundle?.english_name}
          isRTL={isRTL}
        />
        
        <Divider sx={{ width: "100%", borderColor: "#000000", mb: 3, borderWidth: 1 }} />
        
        <Box
          sx={{
            width: "100%",
            minHeight: "40%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: isRTL ? "flex-end" : "flex-start",
            textAlign: isRTL ? "right" : "left",
            marginBottom: 2,
            "& > div:not(:last-child)": {
              marginBottom: "0.5rem",
            },
          }}
        >
          <Box sx={{ color: "#27307F", fontWeight: "bold", fontSize: "1.2rem", width: "100%" }}>
            {priceText}
          </Box>
          
          {offerText && (
            <Box sx={{ color: "#333333", fontSize: "1rem", width: "100%" }}>
              {offerText}
            </Box>
          )}
          
          <Box sx={{ textAlign: "center", alignSelf: "center", mt: 1, mb: 2, width: "100%" }}>
            <CTAButton
              label={bookBtnText}
              onClick={() => router.push(`${prefix}/${paths.contact}`)}
            />
          </Box>
          
          {Bundle?.advantages?.map((advantage, index) => (
            <BulletPoint 
              key={index} 
              title={advantage} 
              locale={locale}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function CardInfo({ cardTitle = "No Title", isRTL }) {
  return (
    <Box 
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: isRTL ? "flex-end" : "flex-start",
        textAlign: isRTL ? "right" : "left",
        gap: "0.5rem",
      }}
    >
      <Box sx={{ paddingTop: "10px", fontSize: "20px", color: "#27307F", fontWeight: "bold" }}>
        {cardTitle}
      </Box>
    </Box>
  );
}