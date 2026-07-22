"use client";

import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import InputField, { PhoneField } from "@/components/helpfulComp/InputField";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { matchIsValidTel } from "mui-tel-input";
import { ContactUsApi } from "@/utils/apis";

export default function Connectwithus({ locale }) {
  const theme = useTheme();
  const { t } = useTranslation();
  
  const currentLang = locale || (theme.direction === 'rtl' ? 'ar' : 'en');
  const isRtl = currentLang === 'ar';

  const Contactus = t("Contactus") || {};
  const [isLoading, setisLoading] = useState(false);

  const schema = Joi.object({
    name: Joi.string().required(),
    company_name: Joi.string().optional().allow(""),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "eg", "sa", "ae"] } }),
    Phone: Joi.string().required().custom((value, helpers) => {
        if (matchIsValidTel(value, { onlyCountries: ["AE", "SA", "EG"] })) return value;
        return helpers.error("string.pattern.base");
    }),
    details: Joi.string().required(),
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: joiResolver(schema) });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (inputs) => {
    setisLoading(true);
    try {
      const success = await ContactUsApi(inputs.name, inputs.company_name, inputs.email, inputs.Phone, inputs.details);
      if (success.status === 200) setSuccessMessage(Contactus.SentSucc || "Sent successfully");
      else setErrorMessage(Contactus.SentErr || "Failed to send");
    } catch (err) {
      setErrorMessage("Error occurred");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "4rem 2rem", direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", marginBottom: "4rem" }}>
          <Typography variant="h3" sx={{ fontFamily: "Cairo", fontWeight: "700", color: "#131F89" }}>
            {Contactus.Title || (isRtl ? "اتصل بنا" : "Contact Us")}
          </Typography>
          <Typography sx={{ fontFamily: "Cairo", color: "#666", mt: 1 }}>
            {Contactus.Desc || ""}
          </Typography>
        </Box>
      </Container>
      <Box sx={{ width: "100%", background: "rgba(71, 193, 202, 0.08)", padding: "4rem 0" }}>
        <Container maxWidth="md">
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ background: "#FFFFFF", padding: "3rem", borderRadius: "16px" }}>
            <Grid container spacing={2}>
              {/* تم إزالة كلمة item من جميع عناصر Grid لمنع حدوث خطأ الـ DOM */}
              <Grid xs={12} md={6}>
                <InputField label={Contactus.Name || "Name"} ele="name" register={register} errors={errors} />
              </Grid>
              <Grid xs={12} md={6}>
                <InputField label={Contactus.Company || "Company"} ele="company_name" register={register} errors={errors} />
              </Grid>
              <Grid xs={12}>
                <InputField label={Contactus.Email || "Email"} ele="email" register={register} errors={errors} />
              </Grid>
              <Grid xs={12}>
                <PhoneField label={Contactus.Phone || "Phone"} ele="Phone" register={register("Phone")} errors={errors} control={control} />
              </Grid>
              <Grid xs={12}>
                <InputField label={Contactus.Message || "Message"} ele="details" register={register} errors={errors} multiline />
              </Grid>
              <Grid xs={12}>
                <button 
                  type="submit" 
                  disabled={isLoading} 
                  style={{ 
                    width: "100%", 
                    padding: "1rem", 
                    backgroundColor: "#131F89", 
                    color: "#fff", 
                    border: "none", 
                    borderRadius: "8px", 
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem"
                  }}
                >
                  {isLoading ? "...جاري الإرسال" : (Contactus.Submit || "Submit")}
                </button>
              </Grid>
            </Grid>
            {successMessage && <Typography sx={{ color: 'green', mt: 2, textAlign: 'center' }}>{successMessage}</Typography>}
            {errorMessage && <Typography sx={{ color: 'red', mt: 2, textAlign: 'center' }}>{errorMessage}</Typography>}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}