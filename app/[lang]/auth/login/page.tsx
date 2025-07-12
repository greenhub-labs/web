'use client';

import { AuthForm } from '@/contexts/auth/presentation/components/organisms/auth-form/auth-form';
import AuthTemplate from '@/contexts/auth/presentation/components/templates/auth-template/auth-template';
import { useAuth } from '@/contexts/auth/presentation/hooks/use-auth';
import { useTranslations } from 'next-intl';
import { AuthFormType } from '@/contexts/auth/domain/validators/auth-form.schema';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const t = useTranslations();
  const { login, loginStatus } = useAuth();
  const router = useRouter();

  // Ahora recibimos los datos validados, no el evento
  const handleLogin = async (data: AuthFormType) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (loginStatus === 'success') {
      router.push('/');
    }
  }, [loginStatus, router]);

  return (
    <AuthTemplate>
      <AuthForm
        mode="login"
        switchUrl="/auth/register"
        switchText={t('pages.auth.login.register')}
        onSubmit={handleLogin}
        isLoading={loginStatus === 'pending'}
      />
    </AuthTemplate>
  );
};

export default LoginPage;
