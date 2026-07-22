"use client";

import { Box, Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Btn from "@/components/helpfulComp/Btn";
import Link from "next/link";
import { Question } from "@/components/helpfulComp/Question";
import { useTheme } from "@emotion/react";
import React, { useState, useEffect } from 'react';
import api from '@/utils/apis';
import { useLangPrefix } from "@/hooks/useLangPrefix";
import { getPagePathsForLang } from "@/config/pagePaths";

export default function FQA() {
  const { t, i18n } = useTranslation();
  const { btn, desc, other, title1 } = t("CommonQues");
  const theme = useTheme();
  const prefix = useLangPrefix();
  const paths = getPagePathsForLang(i18n.language);
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/faq/');
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setData([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Grid>
        <Container>
          <Grid
            container
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: "2rem 0",
              "& > div:not(:last-child)": {
                marginBottom: "2rem",
              },
            }}
          >
            <Grid
              sx={{
                fontFamily: "Tajawal",
                fontSize: "32px",
                fontWeight: "700",
                lineHeight: "24px",
                color: "#131F89",
              }}
            >
              FAQs
            </Grid>
            <Grid
              sx={{
                fontFamily: "Tajawal",
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "30px",
                color: "#4F4F4F",
              }}
            >
              {title1}
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid
        sx={{
          background: "#F9FAFB",
          padding: "2rem 0",
        }}
      >
        <Container>
          <Grid
            container
            sx={{
              justifyContent: "center",
              textAlign: "end",
              marginBottom: "3rem",
              "& > div:not(:last-child)": {
                marginBottom: "1rem",
              },
            }}
          >
            {data?.map((Q, idx) => (
              <Question 
                key={Q.id || idx} 
                ques={theme.direction === 'rtl' ? Q.arabic_question : Q.english_question} 
                ans={theme.direction === 'rtl' ? Q.arabic_answer : Q.english_answer} 
                bg={"#F9FAFB"} 
              />
            ))}
          </Grid>
          <OtherQues btn={btn} desc={desc} other={other} prefix={prefix} paths={paths} />
        </Container>
      </Grid>
    </>
  );
}

function OtherQues({ btn, other, desc, prefix, paths }) {
  return (
    <Grid
      sx={{
        background: "white",
        padding: "3rem",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        "& > div:not(:last-child)": {
          marginBottom: "1rem",
        },
      }}
    >
      <Box
        sx={{
          fontFamily: "Tajawal",
          fontSize: "20px",
          fontWeight: "700",
          lineHeight: "30px",
          color: "#1A1A1A",
          textAlign: "center",
        }}
      >
        {other}
      </Box>
      <Box
        sx={{
          fontFamily: "Tajawal",
          fontSize: "18px",
          fontWeight: "400",
          lineHeight: "28px",
          color: "#4F4F4F",
          textAlign: "center",
        }}
      >
        {desc}
      </Box>
      <Link href={`${prefix}/${paths?.contact}`}>
        <Btn bg={"#131F89"} FontColor={"white"} W={"200px"} H={"60px"}>
          {btn}
        </Btn>
      </Link>
    </Grid>
  );
}