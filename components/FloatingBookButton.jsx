"use client";

import { Box } from "@mui/material";
import { usePathname } from "next/navigation";

export default function FloatingBookButton({ bookNowText, contactHref }) {
  const pathname = usePathname();
  const isRtl = pathname?.split('/')[1] === "ar";

  return (
    <Box
      component="a"
      href={contactHref}
      sx={{
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        right: isRtl ? "unset" : "20px",
        left: isRtl ? "20px" : "unset",
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #5DD5E0 0%, #47C1CA 100%)",
        boxShadow: "0 0 0 15px rgba(77, 193, 202, 0.2), 0 4px 15px rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "10px",
        transition: "all 0.3s ease",
        textDecoration: "none",
        zIndex: 1000,
        "&:hover": {
          transform: "translateY(-50%) scale(1.05)",
          boxShadow: "0 0 0 20px rgba(77, 193, 202, 0.25), 0 6px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ color: "#fff", textAlign: "center", fontSize: "14px", fontWeight: "600", lineHeight: "1.4" }}>
        {bookNowText}
      </Box>
    </Box>
  );
}