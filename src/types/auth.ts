import { LucideIcon } from "lucide-react";
import React from "react";
import { z } from "zod";

// types  untuk props auth
export interface PropsAuth {
  image: string;
  fields: InputFieldsAuth[];
  step: "signin" | "signup";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

//  props untuk input auth
export type InputFieldsAuth = {
  name: string;
  id: string;
  Icon: React.ReactElement<LucideIcon>;
  value: string;
  label: string;
  type: "email" | "string";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isPassword?: boolean;
  error?: string;
};

// validasi dari client menggunakan zod
export const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    email: z.string().email({ message: "Email tidak valid" }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Password harus mengandung huruf besar, kecil, dan angka",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"], // menunjukkan field confirm password yang error
  });

//   validasi login
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message: "Password harus mengandung huruf besar, kecil, dan angka",
    }),
});
//   mengubah object ke type
export type LoginDto = z.infer<typeof LoginSchema>;
//  mengubah object ke type
export type RegisterDto = z.infer<typeof RegisterSchema>;
