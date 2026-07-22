"use client";

import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Check from '@mui/icons-material/Check';
import { useTheme } from '@emotion/react';

const steps = [
  { title: 'التقرير الضريبي', status: "تم", color: "#13CE66", download: "true" },
  { title: 'التقرير الضريبي', status: "قيد الانتظار", color: "#2D8EFF" },
  { title: 'التقرير الضريبي', status: "معلق", color: "#828282" },
  { title: 'التقرير الضريبي', status: "معلق", color: "#828282" }
];

const QontoStepIconRoot = styled('div')(({ theme, ownerState: { active, completed } }) => ({
  color: active ? '#2D8EFF' : ' #eaeaf0',
  minWidth: '20px',
  margin: "-0.5rem 0rem",
  justifyContent: "center",
  border: completed ? '3px solid #784af4' : active ? '3px solid #2D8EFF' : '3px solid #eaeaf0',
  borderRadius: '2rem',
  padding: '.5rem',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': { color: '#784af4', zIndex: 1, fontSize: 18 },
  '& .QontoStepIcon-circle': { width: 8, height: 8, borderRadius: '50%', backgroundColor: 'currentColor' },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <QontoStepIconRoot ownerState={{ active, completed }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  );
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 10, left: 'calc(-50% + 16px)', right: 'calc(50% + 16px)' },
  [`&.${stepConnectorClasses.active}`]: { [`& .${stepConnectorClasses.line}`]: { borderColor: '#784af4' } },
  [`&.${stepConnectorClasses.completed}`]: { [`& .${stepConnectorClasses.line}`]: { borderColor: '#784af4' } },
  [`& .${stepConnectorClasses.line}`]: { borderColor: '#eaeaf0', margin: "0rem 0.5rem", borderTopWidth: 3, borderRadius: 1 },
}));

export default function StepperComp() {
  const theme = useTheme();
  return (
    <Grid>
      <Container sx={{ direction: `ltr !important` }}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
            {steps.map((item, index) => (
              <Step key={index} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <StepLabel StepIconComponent={QontoStepIcon}
                  optional={<Typography variant="caption" sx={{ color: item.color, fontFamily: "Tajawal", fontWeight: 500, fontSize: "16px" }}>{item.status}</Typography>}
                >
                  <Typography sx={{ color: "#131F89", fontFamily: "Tajawal", fontWeight: 700, fontSize: "16px" }}>{item.title}</Typography>
                </StepLabel>
                {item.download ? (
                  <Grid sx={{ border: "2px solid #D0D5DD", borderRadius: "8px", background: '#F9FAFB', color: "#131F89", display: "flex", padding: "0.5rem", width: "40%", justifyContent: "space-around", cursor: "pointer", fontFamily: "Tajawal", fontWeight: 500, fontSize: "14px", marginTop: "0.5rem" }}>
                    <Box><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none"><path d="M6.16699 13.1667L9.50033 16.5M9.50033 16.5L12.8337 13.1667M9.50033 16.5V9M16.167 12.9524C17.1849 12.1117 17.8337 10.8399 17.8337 9.41667C17.8337 6.88536 15.7816 4.83333 13.2503 4.83333C13.0682 4.83333 12.8979 4.73833 12.8054 4.58145C11.7187 2.73736 9.71235 1.5 7.41699 1.5C3.96521 1.5 1.16699 4.29822 1.16699 7.75C1.16699 9.47175 1.8632 11.0309 2.98945 12.1613" stroke="#131F89" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" /></svg></Box>
                    تنزيل
                  </Grid>
                ) : null}
              </Step>
            ))}
          </Stepper>
        </Stack>
      </Container>
    </Grid>
  );
}