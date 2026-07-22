"use client";

import { useTheme } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import React from "react";

export default function InputError({ message }) {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={5.5}
      sx={{
        display: "flex",
        justifyContent: "end",
        fontSize: "12px",
        fontWeight: "400",
        lineHeight: " 13.39px",
        color: "#878787",
        direction: `${theme.direction}`,
      }}
    >
      <Box pr={1}>{message ? message : "أن يحتوى على حرف كبير على الأقل"}</Box>
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
        >
          <path
            d="M12 6.5C12 9.8135 9.3135 12.5 6 12.5C2.6865 12.5 0 9.8135 0 6.5C0 3.1865 2.6865 0.5 6 0.5C9.3135 0.5 12 3.1865 12 6.5Z"
            fill="#D6D6D6"
          />
          <path
            d="M8.78503 3.92871L4.56888 7.55988L2.82836 6.06689L1.94971 6.82274L4.57012 9.07157L9.66399 4.68456L8.78503 3.92871Z"
            fill="#878787"
          />
        </svg>
      </Box>
    </Grid>
  );
}