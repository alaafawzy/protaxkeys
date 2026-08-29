import React from "react";
import { Container, Typography, Box } from "@mui/material";
import MathJaxContent from "@/components/helpfulComp/MathJaxContent";

export default function BlogDetails({ locale, blog }) {
  // الاعتماد حصرياً على الـ locale القادم من الـ URL كمرجع للغة
  const currentLang = locale || 'ar';
  if (!blog) {
    return (
      <Typography align="center" color="error" sx={{ mt: 8 }}>
        {currentLang === 'ar' ? 'المقال غير موجود.' : 'Blog post not found.'}
      </Typography>
    );
  }

  const isRtl = currentLang === 'ar';

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8, direction: isRtl ? 'rtl' : 'ltr' }}>
      <Typography 
        component="h1"
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
          direction: isRtl ? 'rtl' : 'ltr',
          textAlign: 'start',
          unicodeBidi: 'plaintext',
          "& p, & div, & span, & li, & ul, & ol": {
            direction: 'inherit',
            textAlign: 'start',
            unicodeBidi: 'inherit',
          },
        }}
      >
        <MathJaxContent html={isRtl ? blog?.arabic_content : blog?.english_content} />
      </Box>
    </Container>
  );
}