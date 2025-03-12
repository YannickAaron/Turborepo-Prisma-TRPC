"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import { userSchema } from "~/types/schemas/user";
import { UserFormValues, UserInferredType } from "~/types/ts-types/user";
import { useTRPC } from "~/lib/trpc";

import { ChipInput } from "../chip-input";

interface UserFormProps {
  user: UserInferredType;
}

const bloodTypes = [
  {
    value: "A_POSITIVE",
    label: "A+",
  },
  {
    value: "A_NEGATIVE",
    label: "A-",
  },
  {
    value: "B_POSITIVE",
    label: "B+",
  },
  {
    value: "B_NEGATIVE",
    label: "B-",
  },
  {
    value: "AB_POSITIVE",
    label: "AB+",
  },
  {
    value: "AB_NEGATIVE",
    label: "AB-",
  },
  {
    value: "O_POSITIVE",
    label: "O+",
  },
  {
    value: "O_NEGATIVE",
    label: "O-",
  },
];

export default function UserForm({ user }: UserFormProps) {
  const trpc = useTRPC();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      name: user?.name ?? undefined,
      birthDate: user?.birthDate ?? undefined,
      sex: (user?.sex as "Male" | "Female" | "Other") ?? "",
      height: user?.height ?? undefined,
      weight: user?.weight ?? undefined,
      bloodGroup: user?.bloodGroup ?? "",
      allergies: user?.allergies ?? [],
      intolerances: user?.intolerances ?? [],
      inmunizationHistory: user?.inmunizationHistory ?? [],
      insuranceInfo: user?.insuranceinfo ?? undefined,
      familyHistory: user?.familyHistory ?? undefined,
      lifestyle: user?.lifestyle ?? undefined,
      emergencyContact: user?.emergencyContact ?? undefined,
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [pdfIsLoading, setPdfIsLoading] = useState(false);
  const [QR, setQR] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const createForm = useMutation(
    trpc.user.updateUser.mutationOptions({
      onSuccess: () => {
        setOpenSnackbar(true);
      },
      onError: (error) => {
        console.error("Form submission error:", error);
      },
    })
  );

  const onSubmit = async (data: UserFormValues) => {
    await createForm.mutateAsync({ ...data });
  };

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="space-between" mb={1}>
          <Typography
            fontSize="32px"
            fontWeight="bold"
            p={2}
            width="fit-content"
          >
            Personal Medical Information
          </Typography>
        </Stack>

        <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 1, p: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                alt={user?.name}
                src={user?.image ?? undefined}
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Typography fontSize={"18px"}>Basic Details</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("name")}
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid container xs={12} md={12} spacing={2}>
                  <Grid item xs={12} md={4} mt={2}>
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <DatePicker
                          value={value ? dayjs(value) : null}
                          onChange={(newValue) => {
                            onChange(
                              newValue ? dayjs(newValue).toDate() : null
                            );
                          }}
                          label="Birth Date"
                          {...fieldProps}
                          slotProps={{
                            textField: {
                              error: !!errors.birthDate,
                              helperText: errors.birthDate?.message,
                              fullWidth: true,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Controller
                      name="sex"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Sex</InputLabel>
                          <Select {...field} label="Sex">
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      {...register("height")}
                      label="Height (cm)"
                      type="number"
                      fullWidth
                      margin="normal"
                      error={!!errors.height}
                      helperText={errors.height?.message}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField
                      {...register("weight")}
                      label="Weight (kg)"
                      fullWidth
                      type="number"
                      margin="normal"
                      error={!!errors.weight}
                      helperText={errors.weight?.message}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Controller
                      name="bloodGroup"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth margin="normal">
                          <InputLabel>Blood Group</InputLabel>
                          <Select {...field} label="Blood Group">
                            {bloodTypes.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="allergies"
                      control={control}
                      render={({ field }) => (
                        <ChipInput
                          {...field}
                          label="Allergies"
                          onChange={(chips) => field.onChange(chips)}
                          prevData={user?.allergies}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="intolerances"
                      control={control}
                      render={({ field }) => (
                        <ChipInput
                          {...field}
                          label="Intolerances"
                          onChange={(chips) => field.onChange(chips)}
                          prevData={user?.intolerances}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name="inmunizationHistory"
                      control={control}
                      render={({ field }) => (
                        <ChipInput
                          {...field}
                          label="Vaccination History"
                          onChange={(chips) => field.onChange(chips)}
                          prevData={user?.inmunizationHistory}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("insuranceInfo")}
                      fullWidth
                      label="Insurance Info"
                      margin="normal"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("familyHistory")}
                      fullWidth
                      label="Family History"
                      margin="normal"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("lifestyle")}
                      fullWidth
                      label="Lifestyle"
                      margin="normal"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      {...register("emergencyContact")}
                      fullWidth
                      label="Emergency Contact"
                      margin="normal"
                      error={!!errors.emergencyContact}
                      helperText={errors.emergencyContact?.message}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <Button
                loading={isSubmitting}
                type="submit"
                sx={{
                  color: "black",
                  border: "none",
                }}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </Box>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                onClose={() => setOpenSnackbar(false)}
                severity="success"
                sx={{ width: "100%" }}
              >
                Form updated successfully!
              </Alert>
            </Snackbar>
          </form>
        </Box>
      </Container>
    </>
  );
}
