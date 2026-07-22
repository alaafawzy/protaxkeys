"use client";

import React from "react";
import { TextField, InputLabel, Grid } from "@mui/material";

export default function ImageInputField({ ele, label, xs, md, register, errors }) {
  return (
    <Grid item xs={xs} md={md}>
      <InputLabel htmlFor={ele} sx={{ marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
        {label}
      </InputLabel>
      <TextField
        id={ele}
        type="file"
        {...register(ele)}
        error={Boolean(errors[ele])}
        inputProps={{ accept: "image/*" }}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          "& .MuiInputBase-root": {
            height: "40px",
            background: "#F8F8F8",
            borderRadius: "5px",
          },
        }}
      />
      {errors[ele] && (
        <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
          {errors[ele].message}
        </p>
      )}
    </Grid>
  );
}