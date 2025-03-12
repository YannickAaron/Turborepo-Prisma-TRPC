import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  birthDate: z.date({ message: "Invalid date format" }).optional(),
  sex: z.enum(["Male", "Female", "Other"]).optional(),
  height: z.coerce
    .number()
    .min(0, "Height must be a positive number")
    .optional(),
  weight: z.coerce
    .number()
    .min(0, "Weight must be a positive number")
    .optional(),
  bloodGroup: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  intolerances: z.array(z.string()).optional(),
  inmunizationHistory: z.array(z.string()).optional(),
  insuranceInfo: z.string().optional(),
  familyHistory: z.string().optional(),
  lifestyle: z.string().optional(),
  emergencyContact: z.string().optional(),
});
