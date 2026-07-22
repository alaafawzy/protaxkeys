"use client";

import React, { useEffect, useState } from "react";
import { Grid, Container, Typography } from "@mui/material";
import { usePageMetadata } from "@/hooks/useMetaData";
import BlogCard from "@/components/helpfulComp/BlogCard";
import api from "@/utils/apis";
import { useTheme } from "@emotion/react";

export default function Blogs({ locale }) {
  usePageMetadata('blog');

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  // تحديد اللغة بدقة من الـ prop أو قراءة الرابط مباشرة من المتصفح كاحتياطي
  const currentLang = locale || (typeof window !== 'undefined' && window.location.pathname.split('/')[1] === 'en' ? 'en' : 'ar');
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`/blog/blogs/?lang=${currentLang}`);
        setBlogs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentLang]);

  return (
    <Grid sx={{ margin: "2rem 0", direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 4, 
            textAlign: "center", 
            color: '#131F89', 
            fontFamily: 'Cairo, sans-serif' 
          }}
        >
          {isRtl ? "مدونة" : "Blogs"}
        </Typography>

        {loading && <Typography align="center">Loading...</Typography>}
        {error && <Typography align="center" color="error">Error loading blogs.</Typography>}

        <Grid container direction="column" spacing={3}>
          {blogs.map((blog) => (
            <Grid xs={12} key={blog.id} sx={{ borderTop: "1px solid #ccc", pt: 3, pb: 3 }}>
              <BlogCard
                id={blog.id}
                englishSlug={blog.english_slug}
                arabicSlug={blog.arabic_slug}
                title={isRtl ? blog.arabic_title : blog.english_title}
                description={isRtl ? blog.arabic_description : blog.english_description}
                image={blog.image}
                created={blog.created_at || blog.created || blog.date}
                english_alt={blog.english_alt}
                arabic_alt={blog.arabic_alt}
                locale={currentLang}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}