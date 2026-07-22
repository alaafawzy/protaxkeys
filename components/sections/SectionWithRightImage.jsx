import React from 'react';
import { useTheme } from "@emotion/react";
import { getAltText } from '@/utils/getAltText';
export default function SectionWithRightImage({ data ,imageOnRight=false}) {
    const theme = useTheme();
  
  imageOnRight=theme.direction=='rtl'?(!imageOnRight):(imageOnRight)
  const lang=theme.direction=='rtl'?'rtl':'ltr';
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '30px auto',

      padding: '4rem 2rem',
      fontFamily: 'Cairo, sans-serif'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        {/* Left Side - Image */}
        <div>
          <img
            src={data?.image}
            alt={getAltText(data, theme.direction === 'rtl', 'Service section')}
            style={{
              width: '90%',
              height: 'auto',
            }}
          />
        </div>

        {/* Right Side - Content */}
        <div style={{
          // order: imageOnRight ? 1 : 2,
          textAlign: lang=='rtl'?'right':'left'
        }}>
          <div dangerouslySetInnerHTML={{ __html: theme.direction === "rtl" ? data?.arabic_content : data?.english_content }} />
        </div>
      </div>
    </div>
  );
}