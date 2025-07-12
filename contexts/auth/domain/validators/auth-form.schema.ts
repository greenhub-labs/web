import { z } from 'zod';

// Login schema for validation
export const loginSchema = z.object({
  email: z.string().email('pages.auth.validation.email'),
  password: z.string().min(6, 'pages.auth.validation.password'),
});

// Register schema for validation
export const registerSchema = z
  .object({
    email: z.string().email('pages.auth.validation.email'),
    password: z.string().min(6, 'pages.auth.validation.password'),
    confirmPassword: z.string().min(6, 'pages.auth.validation.confirmPassword'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'pages.auth.validation.passwordsDontMatch',
    path: ['confirmPassword'],
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;
export type AuthFormType = LoginForm | RegisterForm;
