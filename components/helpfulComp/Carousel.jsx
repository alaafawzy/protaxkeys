"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

export default function CarouselComponent(props) {
    return (
        <Carousel>
            {props.items.map((item, i) => (
                <Box
                    key={i} // إضافة key للـ map هو ممارسة برمجية جيدة في React
                    sx={{
                        position: 'relative',
                        display: 'inline-block',
                        width: '100%',
                        maxWidth: '700px',
                        margin: '0 auto',
                    }}
                >
                    <img
                        src={item?.img} 
                        alt={item?.name || "Carousel image"}
                        style={{ width: '100%', display: 'block' }} // إضافة display block لإزالة مسافة زائدة تحت الصورة
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '80%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            padding: '10px',
                            borderRadius: '8px',
                        }}
                    >
                        <Typography variant="h5" align="center" color='rgb(255,255,255)'>
                            {item?.description}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Carousel>
    );
}