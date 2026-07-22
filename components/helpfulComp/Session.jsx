import React from "react";
import { Box, Grid } from "@mui/material";

export default function Session({ title, desc }) {
  return (
    <Grid sx={{ "&:hover": { borderEnd: "4px solid rgba(19, 31, 137, 1)" } }}>
      <Grid>
        <Grid item xs={12}>
          <Box sx={{ color: "rgba(26, 26, 26, 1)", fontSize: "20px", fontWeight: "700" }}>
            {title}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ color: "rgba(79, 79, 79, 1)" }}>{desc}</Box>
        </Grid>
      </Grid>
    </Grid>
  );
}