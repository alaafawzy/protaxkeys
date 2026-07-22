"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Container, Box } from "@mui/material";
import { usePageMetadata } from "@/hooks/useMetaData";
import api from '@/utils/apis';
import Feedback from './sections/Feedback';
import OurSystems from './sections/OurSystems';
import AboutWithRightPic from './sections/AboutRightpic';
import SectionsWithLeftPic from './sections/AboutLeftPic';

export default function AboutUs({ locale, dict }) {
  usePageMetadata('about');

  const isRtl = locale === 'ar';
  
  const [data, setData] = useState({});
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch About Us info
        const aboutResponse = await api.get('/aboutUs/');
        if (aboutResponse.data) {
          setData(aboutResponse.data[0] || {});
        }

        // Fetch About Sections
        const sectionsResponse = await api.get('/about/sections/');
        if (sectionsResponse.data) {
          setSections(sectionsResponse.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '3rem' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', padding: '3rem' }}>Error: {error.message}</p>;

  // Map API data to component format
  const sec_data = sections?.map(section => ({
    title: isRtl ? section.arabic_title : section.english_title,
    description: isRtl ? section.arabic_content : section.english_content,
    section_image: section.section_image,
    arabic_alt: section.arabic_alt,
    english_alt: section.english_alt,
  }));

  return (
    <Box sx={{ width: "100%", direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container
        sx={{
          justifyContent: "center",
          "& > div:not(:last-child)": {
            marginBottom: "4rem",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "& > div:not(:first-of-type)": {
              marginBottom: "1.5rem",
              fontFamily: "Cairo",
              fontSize: "1.3rem",
              fontWeight: "400",
              lineHeight: "30px",
              color: "#4F4F4F",
              textAlign: isRtl ? "right" : "left",
            },
          }}
        >
          <Box
            sx={{
              fontFamily: "Cairo",
              fontSize: "32px",
              fontWeight: "700",
              lineHeight: "48px",
              textAlign: "center",
              color: "#131F89",
              marginBottom: "3rem",
              marginTop: "3rem",
            }}
          >
            {isRtl ? data?.arabic_title : data?.english_title}
          </Box>
          <Box
            dangerouslySetInnerHTML={{
              __html: isRtl ? data?.arabic_description : data?.english_description
            }}
          />
        </Box>
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "3rem",
            gap: 4
          }}
        >
          {sec_data?.map((section, index) =>
            index % 2 === 0 ? (
              <AboutWithRightPic key={index} data={section} locale={locale} />
            ) : (
              <SectionsWithLeftPic key={index} data={section} locale={locale} />
            )
          )}
          
          <OurSystems locale={locale} dict={dict} />
          <Feedback locale={locale} dict={dict} />
        </Box>
      </Container>
    </Box>
  );
}