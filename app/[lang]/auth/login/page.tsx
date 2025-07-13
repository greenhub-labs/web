'use client';

import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useTranslations } from 'next-intl';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import LoginPageComponent from '@/contexts/auth/presentation/components/pages/login-page/login-page';
import { toast } from 'sonner';

const LoginPage = () => {
  const t = useTranslations();
  const { login, loginStatus } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(
    async (data: AuthFormType) => {
      setIsLoading(true);
      await login({
        email: data.email,
        password: data.password,
      });
      setIsLoading(false);
    },
    [login],
  );

  useEffect(() => {
    switch (loginStatus) {
      case 'success':
        router.push('/');
        break;
      case 'error':
        toast.error(t('pages.auth.login.error'));
        break;
    }
  }, [loginStatus, router]);

  return <LoginPageComponent handleLogin={handleLogin} isLoading={isLoading} />;
};

export default LoginPage;
