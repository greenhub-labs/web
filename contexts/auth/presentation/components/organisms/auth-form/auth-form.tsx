'use client';

import { cn } from '@/contexts/shared/presentation/lib/utils';
import { Button } from '@/contexts/shared/presentation/components/ui/button';
import { Input } from '@/contexts/shared/presentation/components/ui/input';
import { Label } from '@/contexts/shared/presentation/components/ui/label';
import React from 'react';
import { useTranslations } from 'next-intl';
import { SocialSignInGroup } from '../../molecules/social-sign-in-group/social-sign-in-group';
import { useTheme } from 'next-themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  registerSchema,
  AuthFormType,
} from '@/contexts/auth/domain/validators/auth-form.schema';
import { Loader2 } from 'lucide-react';

export interface AuthFormProps {
  mode: 'login' | 'signup';
  switchUrl: string;
  switchText: string;
  isLoading: boolean;
  onSubmit: (data: AuthFormType) => Promise<void>;
}

export function AuthForm({
  mode,
  switchUrl,
  switchText,
  isLoading,
  onSubmit,
}: AuthFormProps) {
  const { resolvedTheme } = useTheme();
  const t = useTranslations();

  const isSignup = mode === 'signup';

  // Elegir el esquema según el modo
  const schema = isSignup ? registerSchema : loginSchema;

  // Integrar react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(schema),
  });

  // Helper para traducción de errores
  const getErrorMessage = (msg: unknown) =>
    typeof msg === 'string' ? t(msg) : '';

  const socialSignInButtons = [
    {
      icon:
        resolvedTheme === 'dark'
          ? '/icons/social/dark/social-github.svg'
          : '/icons/social/light/social-github.svg',
      text: isSignup
        ? t('pages.auth.register.signUpWithGitHub')
        : t('pages.auth.login.signInWithGitHub'),
      isDisabled: true,
    },
    {
      icon: '/icons/social/social-google.svg',
      text: isSignup
        ? t('pages.auth.register.signUpWithGoogle')
        : t('pages.auth.login.signInWithGoogle'),
      isDisabled: true,
    },
  ];

  return (
    <form
      className={cn('flex flex-col gap-6 w-full max-w-[400px]')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSignup
            ? t('pages.auth.register.title')
            : t('pages.auth.login.title')}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {isSignup
            ? t('pages.auth.register.subtitle')
            : t('pages.auth.login.subtitle')}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">{t('pages.auth.login.email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register('email')}
          />
          {errors.email?.message && (
            <span className="text-xs text-destructive">
              {getErrorMessage(errors.email.message)}
            </span>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">{t('pages.auth.login.password')}</Label>
          <Input
            id="password"
            type="password"
            required
            {...register('password')}
          />
          {errors.password?.message && (
            <span className="text-xs text-destructive">
              {getErrorMessage(errors.password.message)}
            </span>
          )}
        </div>
        {isSignup && (
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">
              {t('pages.auth.register.confirmPassword')}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              {...register('confirmPassword')}
            />
            {(errors as any).confirmPassword?.message && (
              <span className="text-xs text-destructive">
                {getErrorMessage((errors as any).confirmPassword.message)}
              </span>
            )}
          </div>
        )}
        {!isSignup && (
          <div className="flex items-center justify-end">
            <a href="#" className="text-sm underline-offset-4 hover:underline">
              {t('pages.auth.login.forgotPassword')}
            </a>
          </div>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 ml-2" />
              {t('common.loading')}
            </>
          ) : (
            <>
              {isSignup
                ? t('pages.auth.register.title')
                : t('pages.auth.login.title')}
            </>
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            {t('pages.auth.login.orContinueWith')}
          </span>
        </div>
        {/* Social Sign In Buttons Refactor */}
        <SocialSignInGroup buttons={socialSignInButtons} />
      </div>
      <div className="text-center text-sm">
        {isSignup ? (
          <>
            <a href={switchUrl} className="underline underline-offset-4">
              {switchText}
            </a>
          </>
        ) : (
          <>
            <a href={switchUrl} className="underline underline-offset-4">
              {switchText}
            </a>
          </>
        )}
      </div>
    </form>
  );
}
