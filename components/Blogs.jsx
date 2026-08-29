"use client";

import React from "react";
import { Grid, Container, Typography, Pagination, Box } from "@mui/material";
import { usePageMetadata } from "@/hooks/useMetaData";
import BlogCard from "@/components/helpfulComp/BlogCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Blogs({ locale, blogs = [], page = 1, totalPages = 1, hasError = false }) {
  usePageMetadata('blog');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // تحديد اللغة بدقة من الـ prop أو قراءة الرابط مباشرة من المتصفح كاحتياطي
  const currentLang = locale || (typeof window !== 'undefined' && window.location.pathname.split('/')[1] === 'en' ? 'en' : 'ar');
  const isRtl = currentLang === 'ar';

  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (value <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(value));
    }

    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ margin: "2rem 0", direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container>
        <Typography 
          component="h1"
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

        {hasError && <Typography align="center" color="error">Error loading blogs.</Typography>}

        {!hasError && blogs.length === 0 && (
          <Typography align="center" sx={{ color: '#666', py: 4 }}>
            {isRtl ? 'لا توجد مقالات متاحة حالياً.' : 'No blogs available right now.'}
          </Typography>
        )}

        <Grid container direction="column" spacing={3}>
          {blogs.map((blog) => (
            <Grid size={12} key={blog.id} sx={{ borderTop: "1px solid #ccc", pt: 3, pb: 3 }}>
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

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              dir={isRtl ? 'rtl' : 'ltr'}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}