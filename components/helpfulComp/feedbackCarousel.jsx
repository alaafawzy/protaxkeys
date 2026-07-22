"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useMediaQuery, useTheme } from '@mui/material';

export default function TestimonialCarousel({ items = [], locale }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isRTL = locale === 'ar';

  const testimonials = items;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length === 0) return [];
    const visible = [];
    const count = isMobile ? 1 : Math.min(3, testimonials.length);
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  if (testimonials.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        No testimonials available
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '1rem' : '2rem',
      fontFamily: 'Open sans, sans-serif',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '0.5rem' : '1rem',
        position: 'relative',
        justifyContent: 'center'
      }}>
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: isMobile ? '36px' : '48px',
            height: isMobile ? '36px' : '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
        >
          {isRTL ? <ChevronLeft size={isMobile ? 24 : 32} color="#333" /> : <ChevronRight size={isMobile ? 24 : 32} color="#333" />}
        </button>

        {/* Testimonials Container */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          overflow: 'hidden',
          flex: 1,
          justifyContent: 'center'
        }}>
          {getVisibleTestimonials().map((testimonial, index) => {
            const isActiveCard = isMobile ? index === 0 : index === 1;
            const cardStyle = isMobile 
              ? { backgroundColor: '#2c3e7d', color: 'white', border: 'none' }
              : isActiveCard 
                ? { backgroundColor: 'white', color: '#000000', border: '2px solid #2c3e7d' }
                : { backgroundColor: '#2c3e7d', color: 'white', border: 'none' };
            
            return (
              <div
                key={testimonial.id || index}
                style={{
                  flex: isMobile ? '0 0 100%' : '0 0 calc(45% - 0.67rem)',
                  maxWidth: isMobile ? '100%' : 'none',
                  ...cardStyle,
                  borderRadius: '16px',
                  padding: isMobile ? '1rem' : '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isRTL ? 'flex-end' : 'flex-start',
                  textAlign: isRTL ? 'right' : 'left',
                  transition: 'all 0.3s ease',
                  minHeight: isMobile ? '180px' : '220px'
                }}
              >
                <h3 style={{
                  fontWeight: '600',
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                  margin: '0 0 0.25rem 0',
                  width: '100%'
                }}>
                  {isRTL ? testimonial.arabic_name : testimonial.english_name}
                </h3>

                <p style={{
                  opacity: 0.8,
                  fontSize: isMobile ? '0.7rem' : '0.8rem',
                  margin: '0 0 1rem 0',
                  fontWeight: "600",
                  color: isActiveCard && !isMobile ? "#777" : "#B9B9B9",
                  width: '100%'
                }}>
                  {isRTL ? testimonial.arabic_job_title : testimonial.english_job_title}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '0.20rem',
                  marginBottom: '1rem'
                }}>
                  {[...Array(testimonial.rate || 0)].map((_, i) => (
                    <Star
                      key={i}
                      size={isMobile ? 12 : 14}
                      fill="#FFD700"
                      color="#FFD700"
                    />
                  ))}
                </div>

                <p style={{
                  lineHeight: 1.6,
                  fontSize: isMobile ? '0.9rem' : '1.1rem',
                  margin: '0 0 1rem 0',
                  fontWeight: "500",
                  fontFamily: "Cairo, sans-serif",
                  width: '100%',
                  color: isActiveCard && !isMobile ? "#333" : "white"
                }}>
                  {isRTL ? testimonial.arabic_description : testimonial.english_description}
                </p>

                <p style={{
                  marginTop: 'auto',
                  opacity: 0.7,
                  fontSize: isMobile ? '0.65rem' : '0.75rem',
                  margin: 'auto 0 0 0',
                  width: '100%'
                }}>
                  {testimonial.created_at ? new Date(testimonial.created_at).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US') : ''}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            width: isMobile ? '36px' : '48px',
            height: isMobile ? '36px' : '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
        >
          {isRTL ? <ChevronRight size={isMobile ? 24 : 32} color="#333" /> : <ChevronLeft size={isMobile ? 24 : 32} color="#333" />}
        </button>
      </div>

      {/* Dots Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '1.5rem'
      }}>
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: currentIndex === index ? '#2c3e7d' : '#d0d0d0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}