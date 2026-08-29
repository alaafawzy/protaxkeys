"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { matchIsValidTel } from "mui-tel-input";
import { MuiTelInput } from "mui-tel-input";
import { ContactUsApi } from "@/utils/apis";
import { Controller } from "react-hook-form";

export default function Connectwithus({ locale, dict }) {
  const currentLang = String(locale || 'ar').toLowerCase().startsWith('en') ? 'en' : 'ar';
  const isRtl = currentLang === 'ar';

  const Contactus = dict?.Contactus || {};
  const Validation = dict?.Validation || {};
  const submitText = isRtl ? 'إرسال' : 'Submit';
  const loadingText = isRtl ? '...جاري الإرسال' : 'Sending...';
  const genericErrorText = isRtl ? 'حدث خطأ أثناء الإرسال' : 'An error occurred while sending';
  const [isLoading, setisLoading] = useState(false);

  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': Validation?.Name || (isRtl ? 'الاسم مطلوب' : 'Name is required'),
      'string.empty': Validation?.Name || (isRtl ? 'الاسم مطلوب' : 'Name is required'),
    }),
    company_name: Joi.string().optional().allow(""),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org", "eg", "sa", "ae"] } }).messages({
      'any.required': Validation?.Email?.req || (isRtl ? 'البريد الإلكتروني مطلوب' : 'Email is required'),
      'string.empty': Validation?.Email?.req || (isRtl ? 'البريد الإلكتروني مطلوب' : 'Email is required'),
      'string.email': Validation?.Email?.pattern || (isRtl ? 'البريد الإلكتروني غير صحيح' : 'Email is invalid'),
    }),
    Phone: Joi.string().required().custom((value, helpers) => {
        if (matchIsValidTel(value, { onlyCountries: ["AE", "SA", "EG"] })) return value;
        return helpers.error("string.pattern.base");
    }).messages({
      'any.required': Validation?.Phone?.req || (isRtl ? 'رقم الهاتف مطلوب' : 'Phone is required'),
      'string.empty': Validation?.Phone?.req || (isRtl ? 'رقم الهاتف مطلوب' : 'Phone is required'),
      'string.pattern.base': Validation?.Phone?.pattern || (isRtl ? 'رقم الهاتف غير صحيح' : 'Phone is invalid'),
    }),
    details: Joi.string().required().messages({
      'any.required': Validation?.Message || (isRtl ? 'الرسالة مطلوبة' : 'Message is required'),
      'string.empty': Validation?.Message || (isRtl ? 'الرسالة مطلوبة' : 'Message is required'),
    }),
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: joiResolver(schema) });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      backgroundColor: '#fff',
      minHeight: '50px',
      '& fieldset': {
        borderColor: 'rgba(39, 48, 127, 0.16)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(39, 48, 127, 0.35)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#47c1ca',
      },
    },
    '& .MuiOutlinedInput-input': {
      fontFamily: 'Cairo, sans-serif',
      fontSize: '1rem',
      py: 1.4,
      px: 2,
      textAlign: isRtl ? 'right' : 'left',
    },
    '& .MuiFormHelperText-root': {
      fontFamily: 'Cairo, sans-serif',
      marginInlineStart: 0,
      textAlign: isRtl ? 'right' : 'left',
    },
  };

  const labelStyles = {
    fontFamily: 'Cairo, sans-serif',
    color: '#5f6370',
    fontSize: '1rem',
    mb: 1.2,
    textAlign: isRtl ? 'end' : 'start',
    width: '100%',
  };

  const onSubmit = async (inputs) => {
    setisLoading(true);
    try {
      const success = await ContactUsApi(inputs.name, inputs.company_name, inputs.email, inputs.Phone, inputs.details);
      if (success.status === 200) setSuccessMessage(Contactus.SentSucc || "Sent successfully");
      else setErrorMessage(Contactus.SentErr || "Failed to send");
    } catch (err) {
      setErrorMessage(Contactus.SentErr || genericErrorText);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", direction: isRtl ? 'rtl' : 'ltr' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", marginBottom: "2.5rem", marginTop: "2rem" }}>
          <Typography variant="h3" sx={{ fontFamily: "Cairo", fontWeight: "700", color: "#131F89" }}>
            {Contactus.Title || (isRtl ? "اتصل بنا" : "Contact Us")}
          </Typography>
          <Typography sx={{ fontFamily: "Cairo", color: "#666", mt: 1 }}>
            {Contactus.Desc || ""}
          </Typography>
        </Box>
      </Container>

      <Box sx={{ width: "100%", background: "rgba(71, 193, 202, 0.08)", padding: { xs: "2.5rem 0", md: "4rem 0" } }}>
        <Container maxWidth="md">
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              boxShadow: '0 8px 25px rgba(28, 54, 89, 0.10)',
              px: { xs: 2, md: 3.5 },
              py: { xs: 2.5, md: 3 },
            }}
          >
          <Grid container spacing={2.4}>
            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { md: isRtl ? -1 : -2 } }}>
              <Typography sx={labelStyles}>{Contactus.Name || (isRtl ? 'الاسم' : 'Name')}</Typography>
              <TextField
                fullWidth
                placeholder={isRtl ? 'أدخل اسمك' : 'Enter your name'}
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message || ' '}
                slotProps={{ htmlInput: { dir: isRtl ? 'rtl' : 'ltr' } }}
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{ order: { md: isRtl ? -2 : -1 } }}>
              <Typography sx={labelStyles}>{Contactus.Company || (isRtl ? 'اسم الشركة (اختياري)' : 'Company name (optional)')}</Typography>
              <TextField
                fullWidth
                placeholder={isRtl ? 'أدخل اسم شركتك' : 'Enter your company name'}
                {...register('company_name')}
                error={Boolean(errors.company_name)}
                helperText={errors.company_name?.message || ' '}
                slotProps={{ htmlInput: { dir: isRtl ? 'rtl' : 'ltr' } }}
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography sx={labelStyles}>{Contactus.Email || 'Email'}</Typography>
              <TextField
                fullWidth
                placeholder="example@email.com"
                type="email"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message || ' '}
                slotProps={{ htmlInput: { dir: 'ltr' } }}
                sx={fieldStyles}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography sx={labelStyles}>{Contactus.Phone || (isRtl ? 'رقم التليفون' : 'Phone number')}</Typography>
              <FormControl fullWidth error={Boolean(errors.Phone)}>
                <Controller
                  name="Phone"
                  control={control}
                  render={({ field }) => (
                    <MuiTelInput
                      {...field}
                      value={field.value ?? ''}
                      defaultCountry="AE"
                      onlyCountries={["AE", "SA", "EG"]}
                      forceCallingCode
                      fullWidth
                      dir={isRtl ? 'rtl' : 'ltr'}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '14px',
                          minHeight: '50px',
                          backgroundColor: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(39, 48, 127, 0.16)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(39, 48, 127, 0.35)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#47c1ca',
                          },
                        },
                        '& input': {
                          fontFamily: 'Cairo, sans-serif',
                          fontSize: '1rem',
                          py: 1.4,
                        },
                      }}
                    />
                  )}
                />
                <FormHelperText sx={{ m: 0, mt: 0.6, textAlign: isRtl ? 'right' : 'left', fontFamily: 'Cairo, sans-serif' }}>
                  {errors.Phone?.message || ' '}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography sx={labelStyles}>{Contactus.Message || (isRtl ? 'استفسارك' : 'Your inquiry')}</Typography>
              <TextField
                fullWidth
                multiline
                minRows={5}
                placeholder={isRtl ? 'اكتب استفسارك هنا...' : 'Write your inquiry here...'}
                {...register('details')}
                error={Boolean(errors.details)}
                helperText={errors.details?.message || ' '}
                slotProps={{ htmlInput: { dir: isRtl ? 'rtl' : 'ltr' } }}
                sx={{
                  ...fieldStyles,
                  '& .MuiOutlinedInput-root': {
                    ...fieldStyles['& .MuiOutlinedInput-root'],
                    minHeight: '170px',
                    alignItems: 'flex-start',
                  },
                  '& .MuiOutlinedInput-input': {
                    ...fieldStyles['& .MuiOutlinedInput-input'],
                    py: 1.8,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                sx={{
                  mt: 0.5,
                  borderRadius: '12px',
                  py: 1.4,
                  backgroundColor: '#47c1ca',
                  color: '#fff',
                  fontFamily: 'Cairo, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  '&:hover': {
                    backgroundColor: '#38aeb7',
                  },
                }}
              >
                {isLoading ? loadingText : (Contactus.Submit || submitText)}
              </Button>
            </Grid>
          </Grid>

          {successMessage && (
            <Typography sx={{ color: '#1f8b4c', mt: 1.2, textAlign: 'center', fontFamily: 'Cairo, sans-serif' }}>
              {successMessage}
            </Typography>
          )}

          {errorMessage && (
            <Typography sx={{ color: '#cf3131', mt: 1.2, textAlign: 'center', fontFamily: 'Cairo, sans-serif' }}>
              {errorMessage}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
    </Box>
  );
}