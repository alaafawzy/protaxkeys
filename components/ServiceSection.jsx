"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import api from "@/utils/apis";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { getPagePathsForLang } from "@/config/pagePaths";

const iconMap = {
  storage: <StorageOutlinedIcon />,
  psychology: <PsychologyOutlinedIcon />,
  task: <TaskAltOutlinedIcon />,
};

export default function ServicesSection({ locale }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  
  const currentLang = locale || (theme.direction === 'rtl' ? 'ar' : 'en');
  const isRtl = currentLang === 'ar';
  const prefix = `/${currentLang}`;
  const paths = getPagePathsForLang(currentLang);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services/services/");
        setServices(response.data);
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f7f8fc", py: 8, direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", color: "#1f2a7a", mb: 6 }}
        >
          {isRtl ? "خدماتنا" : "Our Services"}
        </Typography>

        <Grid container spacing={4} sx={{ direction: isRtl ? 'rtl' : 'ltr' }}>
          {services.map((service) => (
            // تم إزالة كلمة item هنا لمنع ظهور خطأ الـ DOM في الإصدارات الحديثة
            <Grid xs={12} md={4} key={service.id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  background: `linear-gradient(
                    180deg,
                    ${alpha("#27307F", 0.08)} 0%,
                    ${alpha("#27307F", 0.18)} 100%
                  )`,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent sx={{ direction: isRtl ? "rtl" : "ltr" }}>
                  {/* Icon + Title */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                      flexDirection: isRtl ? "row" : "row-reverse",
                    }}
                  >
                    <Box sx={{ color: "#27307F", fontSize: 30 }}>
                      {iconMap[service.icon] || <StorageOutlinedIcon />}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#1f2a7a",
                        textAlign: isRtl ? "end" : "start",
                      }}
                    >
                      {isRtl ? service.arabic_title : service.english_title}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      lineHeight: 1.8,
                      mb: 2,
                      textAlign: isRtl ? "end" : "start",
                    }}
                  >
                    {isRtl ? service.arabic_description : service.english_description}
                  </Typography>

                  <Box
                    component={Link}
                    href={`${prefix}/${paths.serviceDetails.replace(
                      ":slug",
                      currentLang === "en"
                        ? service.english_slug
                        : service.arabic_slug
                    )}`}
                    sx={{
                      color: "#27307F",
                      fontWeight: "bold",
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-block",
                    }}
                  >
                    {isRtl
                      ? ` \u2190  استكشف المزيد `
                      : `Explore More \u2192`}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}