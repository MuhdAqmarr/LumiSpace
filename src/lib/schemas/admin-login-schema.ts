/* ===================================================================
   LumiSpace — Admin Login Validation Schema (Zod)
   =================================================================== */

import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;
