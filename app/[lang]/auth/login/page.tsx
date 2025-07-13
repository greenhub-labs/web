'use client';

import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useTranslations } from 'next-intl';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import LoginPageComponent from '@/contexts/auth/presentation/components/pages/login-page/login-page';

const LoginPage = () => {
  const { login, loginStatus } = useAuth();
  const router = useRouter();

  const handleLogin = useCallback(
    async (data: AuthFormType) => {
      await login({
        email: data.email,
        password: data.password,
      });
    },
    [login],
  );

  useEffect(() => {
    if (loginStatus === 'success') {
      router.push('/');
    }
  }, [loginStatus, router]);

  return (
    <LoginPageComponent handleLogin={handleLogin} loginStatus={loginStatus} />
  );
};

export default LoginPage;
