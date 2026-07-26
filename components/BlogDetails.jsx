"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import api from "@/utils/apis";
import { applyPageMetadata } from "@/utils/metadataServices";
import MathJaxContent from "@/components/helpfulComp/MathJaxContent";

export default function BlogDetails({ locale, id }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // الاعتماد حصرياً على الـ locale القادم من الـ URL كمرجع للغة
  const currentLang = locale || 'ar';
  const blogSlug = id;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // إرسال اللغة الصحيحة للـ API لجلب محتوى المقال باللغة المطلوبة
        const response = await api.get(`/blog/blogs/by-slug/${blogSlug}/?lang=${currentLang}`);
        setBlog(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (blogSlug) {
      fetchBlog();
    }
  }, [blogSlug, currentLang]);

  useEffect(() => {
    // if (blog) {
    //   applyPageMetadata(blog);
    // }

    return () => {
      document
        .querySelectorAll('meta[data-managed-by="prokeys"]')
        .forEach(tag => tag.remove());
    };
  }, [blog, currentLang]);

  if (loading) return <Typography align="center" sx={{ mt: 8 }}>Loading...</Typography>;
  if (error) return <Typography align="center" color="error" sx={{ mt: 8 }}>Error loading blog.</Typography>;
  if (!blog) return null;

  const isRtl = currentLang === 'ar';

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8, direction: isRtl ? 'rtl' : 'ltr' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 700, 
          mb: 5, 
          fontFamily: 'Cairo, sans-serif', 
          color: '#131F89', 
          textAlign: "center" 
        }}
      >
        {isRtl ? blog?.arabic_title : blog?.english_title}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <img
          src={blog.image}
          alt={blog.english_title || "Blog image"}
          style={{ maxWidth: "100%", borderRadius: 16, maxHeight: 400, objectFit: "cover" }}
        />
      </Box>
      
      <Box 
        sx={{ 
          fontFamily: 'Cairo, sans-serif', 
          fontSize: '1.1rem', 
          color: '#333',
          textAlign: isRtl ? 'right' : 'left',
          "& p, & div, & span, & li, & ul, & ol": {
            direction: isRtl ? 'rtl' : 'ltr',
            textAlign: isRtl ? 'right' : 'left',
          },
        }}
      >
        <MathJaxContent html={isRtl ? blog?.arabic_content : blog?.english_content} />
      </Box>
    </Container>
  );
}