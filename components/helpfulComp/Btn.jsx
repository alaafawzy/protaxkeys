"use client";

import { useTheme } from "@emotion/react";
import { CircularProgress, Box } from "@mui/material";

export default function Btn({
  children,
  bg,
  FontColor,
  m,
  p,
  H,
  W,
  onClick,
  component,
  disabled,
  isLoading,
}) {
  const theme = useTheme();

  return (
    <Box
      component={component || "button"}
      disabled={disabled}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: disabled ? "" : bg,
        boxSizing: "border-box",
        borderRadius: "10px",
        border: "1px solid white",
        color: `${FontColor} !important`,
        height: H ? H : "40px",
        width: W ? W : "auto",
        padding: p || "0 1rem",
        cursor: disabled ? "not-allowed" : "pointer",
        margin: m,
        fontFamily: theme.fontFamily || "inherit", 
        fontSize: ".8rem",
        fontWeight: "700",
        lineHeight: "24px",
      }}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress color="inherit" size="1.5rem" /> : children}
    </Box>
  );
}