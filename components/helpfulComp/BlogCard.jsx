"use client";

import React from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@emotion/react";
import { getAltText } from "@/utils/getAltText";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function BlogCard({ id, englishSlug, arabicSlug, title, description, image, created, english_alt, arabic_alt, locale }) {
    const theme = useTheme();

    // تحديد اللغة الحالية بدقة من الـ prop أو من مسار المتصفح
    const currentLang = locale || (typeof window !== 'undefined' && window.location.pathname.split('/')[1] === 'en' ? 'en' : 'ar');
    const isRtl = currentLang === 'ar';
    
    // بناء البادئة (Prefix) مباشرة بناءً على اللغة الحالية لضمان عدم ظهور /ar/ بالخطأ
    const prefix = `/${currentLang}`;
    const paths = getPagePathsForLang(currentLang);

    // اختيار الـ Slug الصحيح تماماً بناءً على لغة الصفحة
    const slug = currentLang === "en" 
        ? (englishSlug || arabicSlug || id) 
        : (arabicSlug || englishSlug || id);

    const detailPath = paths.blogDetails.replace(":slug", slug);

    return (
        <Card
            component={Link}
            href={`${prefix}/${detailPath}`}
            sx={{
                borderRadius: 3,
                m: 2,
                width: "100%",
                boxShadow: "none",
                border: "none",
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 0.2s",
                cursor: "pointer",
                '&:hover': { boxShadow: 3 },
            }}
        >
            <Grid
                container
                sx={{
                    flexDirection: { xs: "column", md: isRtl ? "row-reverse" : "row" },
                    alignItems: { xs: "center", md: "stretch" },
                    justifyContent: { xs: "center", md: "flex-start" },
                }}
            >
                <Grid  xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "center",  } }}>
                    <CardMedia
                        component="img"
                        image={image}
                        alt={getAltText({ english_alt, arabic_alt }, isRtl, title)}
                        sx={{
                            width: { xs: 240, md: 240 },
                            height: { xs: 200, md: 200 },
                            objectFit: "cover",
                            padding: { xs: 0, md: 2 },
                            borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
                            maxWidth: 240,
                            minWidth: 180,
                            mx: { xs: "auto", md: 0 },
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                    <CardContent
                        sx={{
                            direction: isRtl ? "rtl" : "ltr",
                            unicodeBidi: "plaintext",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: { xs: "center", md: isRtl ? "flex-end" : "flex-start" },
                            height: "100%",
                            textAlign: { xs: "center", md:"start" },
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                mb: 1,
                                fontFamily: 'Cairo, sans-serif',
                                color: '#131F89',
                                fontSize: '1.5rem',
                                direction: "inherit",
                                unicodeBidi: "inherit",
                                textAlign: "inherit",
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mb: 2,
                                fontFamily: 'Cairo, sans-serif',
                                fontSize: '1rem',
                                direction: "inherit",
                                unicodeBidi: "inherit",
                                textAlign: "inherit",
                            }}
                        >
                            {description}
                        </Typography>
                        {created && (
                            <Typography variant="caption" color="text.secondary">
                                {created}
                            </Typography>
                        )}
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}