"use client";

import React from "react";
import { Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CTAButton from "@/components/helpfulComp/CTAButton";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function WhoAreU({ locale, dict }) {
  const router = useRouter();
  
  const who = dict?.who || {};
  const { serv1, serv2, serv3 } = dict?.OurServises || {};
  
  const isRtl = locale === 'ar';
  const prefix = `/${locale}`;
  const paths = getPagePathsForLang(locale);
  
  const skills = "/images/who we are/skills.png";
  const financial = "/images/who we are/financial.png";
  const whyus = "/images/who we are/whyus.png";

  return (
    <Box className="who-we-are" sx={{ py: 4 }}>
      <Container>
        
        {/* رأس القسم */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "3rem",
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          <Box
            sx={{
              fontFamily: "Cairo",
              fontSize: "2rem",
              fontWeight: "700",
              textAlign: "center",
              color: "#27307F",
              marginBottom: "2rem",
              marginTop: "3rem",
            }}
          >
            {who?.mainTitle}
          </Box>
          <Box
            sx={{
              fontFamily: "Cairo",
              fontSize: { xs: "16px", md: "24px" },
              fontWeight: "500",
              lineHeight: "30px",
              textAlign: "center",
              color: "#B8B8B8",
              width: { xs: "100%", md: "70%" },
            }}
          >
            {who?.mainDesc}
          </Box>
        </Box>

        {/* تفاصيل الخدمات الثلاثة (تم استبدال Grid بـ Box Flexbox لمنع أخطاء الـ item) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: 4,
            direction: isRtl ? 'rtl' : 'ltr',
            marginBottom: "3rem"
          }}
        >
          <SectionDetails image={skills} title={serv3?.title} desc={serv3?.desc} second={false} />
          <SectionDetails image={financial} title={serv2?.title} desc={serv2?.desc} second={true} />
          <SectionDetails image={whyus} title={serv1?.title} desc={serv1?.desc} second={false} />
        </Box>

        {/* زر الحجز */}
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

export function SectionDetails({ image, title, desc, second }) {
  return (
    <Box
      sx={{
        flex: "1 1 30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginBottom: { xs: "2rem", md: 0 },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <img
          src={typeof image === 'object' && image !== null ? image.src : image}
          alt={title || "Service Icon"}
          style={{ height: second ? "170px" : "150px", objectFit: "contain" }}
        />
      </Box>

      <Box
        sx={{
          fontFamily: "Cairo",
          fontSize: "20px",
          fontWeight: 700,
          lineHeight: "30px",
          color: "#27307F",
          marginTop: "1rem",
          marginBottom: "0.5rem"
        }}
      >
        {title}
      </Box>

      <Box
        sx={{
          fontFamily: "Cairo",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          color: "#333333",
        }}
      >
        {desc}
      </Box>
    </Box>
  );
}