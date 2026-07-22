"use client";

import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { icons } from "@/Data/Samka";

export function Question_array({ ques, ans = [], bg }) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const handleChange = () => setExpanded(!expanded);

  const renderAnswer = (asnr) => {
    let phrase = "Leading the following phases";
    let phrase2 = "قيادة المرحلة التالية";
    if (asnr.includes(phrase2)) { phrase = phrase2; }
    if (asnr.includes(phrase)) {
      let [before, after] = asnr.split(phrase);
      if (phrase === phrase2) {
        const temp = before;
        before = after;
        after = temp;
      }
      return (
        <>
          {before}{":"}
          <span>{phrase}</span><br />
          <div>{after}</div>
        </>
      );
    }
    return asnr;
  };

  return (
    <Grid item xs={10} md={12}>
      <Accordion expanded={expanded} onChange={handleChange} sx={{ boxShadow: "none", borderBottom: "1px solid rgba(234, 236, 240, 1)", "&:before": { display: "none" }, background: bg }}>
        <AccordionSummary expandIcon={expanded ? icons.minus : icons.plus} sx={{ flexDirection: "row-reverse", "& .MuiAccordionSummary-content": { flexDirection: "column" } }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500", fontFamily: "Tajawal", color: "rgba(26, 26, 26, 1)" }}>
            {ques}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ fontWeight: "400", fontFamily: "Tajawal", color: "rgba(79, 79, 79, 1)" }}>
            {ans.map((asnr, index) => (
              <div key={index} style={{ marginBottom: "0.5rem", position: "relative", paddingLeft: theme.direction === "ltr" ? "1.5rem" : "0", textAlign: theme.direction === "ltr" ? "left" : "right" }}>
                <span style={{ position: "absolute", [theme.direction === "ltr" ? "left" : "right"]: 0, top: "0.5rem", height: "6px", width: "6px", backgroundColor: "#131F89", borderRadius: "50%" }}></span>
                <div style={{ marginLeft: theme.direction === "ltr" ? "1.5rem" : "0", marginRight: theme.direction === "rtl" ? "1.5rem" : "0" }}>
                  {renderAnswer(asnr)}
                </div>
              </div>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
}