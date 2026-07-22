"use client";

import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { Question } from "@/components/helpfulComp/Question";
import api from '@/utils/apis';

export default function FAQ({ locale, dict }) {
  const isRtl = locale === 'ar';
  const CommonQuesData = dict?.CommonQues || {};
  const title1 = CommonQuesData.title1 || (isRtl ? "الأسئلة الشائعة" : "Frequently Asked Questions");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/faq/');
        setData(Array.isArray(response.data) ? response.data : []);
      } catch (error) { 
        console.error(error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>;

  return (
    <Container 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        textAlign: isRtl ? "end" : "start", 
        fontFamily: "Cairo", 
        direction: isRtl ? 'rtl' : 'ltr',
        "& > div:not(:last-child)": { marginBottom: "1rem" } 
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "center", fontFamily: "Cairo" }}>
        <Box sx={{ color: "#27307F", fontWeight: "700", fontSize: "2.2rem", marginTop: 3, marginBottom: 3 }}>
          {title1}
        </Box>
      </Box>
      <Box>
        {data?.map((Q, idx) => (
          <Question 
            key={idx} 
            ques={isRtl ? Q.arabic_question : Q.english_question} 
            ans={isRtl ? Q.arabic_answer : Q.english_answer} 
            bg={"#F9FAFB"} 
            locale={locale}
          />
        ))}
      </Box>
    </Container>
  );
}